const sugarCaddyUrl = 'https://sugar-caddy-dev.firebaseio.com';

export default (path, ...options) =>
  fetch(`${sugarCaddyUrl}/${path}`, ...options).then(response =>
    response.json().then(json => (response.ok ? json : Promise.reject(json))));
