// These are the necessary methods to SSR an app
// 1. getRoutes()
// 2. createStore()
import routes from '../routes/main';
// import reducers, { initialStates } from '../../js/reducers';
// import Store from '../../js/stores/Store';

function getRoutes() {
  return routes;
}

// THIS IS TO SSR HYDRATE COMPONENTS WITH REDUX DATA
// If you want to do that.....
// function createStore(hydratedProps) {
//   return Store(hydratedProps, initialStates, reducers, sagas);
// }

export default {
  getRoutes,
  // createStore,
  jsBundle: 'main.js',
  cssBundle: 'main.css',
};
