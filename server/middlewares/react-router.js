import React from 'react';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';
// import { Provider } from 'react-redux'; // FOR REDUX LATER?

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

    try {
      const routerContext = {};

      // Initial Data
      const view = ReactDOMServer.renderToString((
        <StaticRouter
          location={location}
          context={routerContext}
        >
          <Layout
            location={location}
            context={routerContext}
          />
        </StaticRouter>
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
