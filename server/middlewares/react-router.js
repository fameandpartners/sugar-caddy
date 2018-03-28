import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../src/store';

// Assets
const clientAssets = require('../../build/asset-manifest.json');


const server = ({
  Layout,
  appData,
  onError,
  onRedirect,
  onRender,
}) =>
  async (ctx, next) => {
    const location = ctx.request.url;

    console.log('location', location);

    try {
      const routerContext = {};

      const { store, history } = configureStore();

      // Initial Data
      const view = ReactDOMServer.renderToString((
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Layout />
          </ConnectedRouter>
        </Provider>
      ));

      ctx.state = {
        ...ctx.state,
        routerContext,
      };

      if (routerContext.url) await onRedirect(ctx, routerContext.url);
      else {
        const { templateRenderer } = await onRender(ctx);
        let html = view;
        if (templateRenderer) {
          html = templateRenderer({
            root: view,
            jsBundle: clientAssets[appData.jsBundle],
            cssBundle: clientAssets[appData.cssBundle],
          });
        }

        if (routerContext.status) ctx.response.status = routerContext.status;

        ctx.response.body = html;
      }
    } catch (err) {
      await onError(ctx, err);
    } finally {
      await next();
    }
  };

export default server;
