import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB-CqBZAUHjpIFAzsR9TVKIaulWA5PmWnA',
  authDomain: 'sugar-caddy-dev.firebaseapp.com',
  databaseURL: 'https://sugar-caddy-dev.firebaseio.com',
  projectId: 'sugar-caddy-dev',
  storageBucket: 'sugar-caddy-dev.appspot.com',
  messagingSenderId: '974707995576',
};

firebase.initializeApp(config);

export default firebase;
