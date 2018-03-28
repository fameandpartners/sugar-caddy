/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import 'css/index.css';
import configureStore from './store';
import AppLayout from './AppLayout';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const { store, history } = configureStore();

const component = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppLayout />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(component, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./AppLayout', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./AppLayout');
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NextRootContainer />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    );
  });
}
