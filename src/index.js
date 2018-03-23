/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppLayout from './js/containers/AppLayout';
import registerServiceWorker from './registerServiceWorker';
// import { Provider } from 'react-redux';

const component = (
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <AppLayout />
    {/* </Provider> */}
  </BrowserRouter>
);
ReactDOM.render(
  component,
  document.getElementById('root'),
);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./js/containers/AppLayout', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./js/containers/AppLayout');
    ReactDOM.render(
      (
        <BrowserRouter>
          {/* <Provider store={store}> */}
          <NextRootContainer />
          {/* </Provider> */}
        </BrowserRouter>
      ),
      document.getElementById('root'),
    );
  });
}
