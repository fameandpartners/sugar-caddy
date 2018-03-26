/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import App from 'components/App';
import 'css/index.css';
import AppLayout from './js/containers/AppLayout';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  form: formReducer,
});

const logger = createLogger({
  collapsed: true,
});

const store = createStore(rootReducer, applyMiddleware(logger));

const component = (
  <BrowserRouter>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(component, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./js/containers/AppLayout', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./js/containers/AppLayout');
    ReactDOM.render(
      <BrowserRouter>
        {/* <Provider store={store}> */}
        <NextRootContainer />
        {/* </Provider> */}
      </BrowserRouter>,
      document.getElementById('root'),
    );
  });
}
