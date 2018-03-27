const path = require('path');

const config = {
  // server
  protocols: {
    web: 'http',
  },
  ports: {
    web: 8080,
  },

  // templating
  buildDir: path.join(__dirname, '..', 'build'),
  serveStatic: {
  },
  env: 'development',
  webRequestTimeoutMs: 6000,
};

module.exports = config;
