import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import App from 'components/App';
import * as reducers from 'reducers';
import 'css/index.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  ...reducers,
  form: formReducer,
});

const mapToJS = (state) => {
  if (state === null || typeof state !== 'object') return state;
  const newState = {};

  for (const i of Object.keys(state)) { // eslint-disable-line
    if (Immutable.Iterable.isIterable(state[i])) {
      newState[i] = state[i].toJS();
    } else {
      newState[i] = state[i];
    }
  }

  return newState;
};

const logger = createLogger({
  collapsed: true,
  stateTransformer: mapToJS,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
