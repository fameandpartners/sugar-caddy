import { applyMiddleware, createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import * as reducers from 'reducers';

export default function configureStore(server = false) {
  const history = server ? createMemoryHistory() : createBrowserHistory();

  const router = routerMiddleware(history);

  const rootReducer = combineReducers({
    ...reducers,
    form: formReducer,
    router: routerReducer,
  });

  const mapToJS = (state) => {
    if (state === null || typeof state !== 'object') return state;
    const newState = {};

    // eslint-disable-next-line
    for (const i of Object.keys(state)) {
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
    applyMiddleware(thunk, logger, router),
  );
  return { store, history };
}
