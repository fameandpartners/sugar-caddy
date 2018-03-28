#!/usr/bin/env node
require('babel-register');
require('babel-polyfill');
require('ignore-styles');
const http = require('http');
const https = require('https');
const Koa = require('koa');
const serveStatic = require('@ladjs/koa-better-static');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const koa404Handler = require('koa-404-handler');
const errorHandler = require('koa-better-error-handler');
const helmet = require('koa-helmet');
const removeTrailingSlashes = require('koa-no-trailing-slash');
// const StoreIPAddress = require('@ladjs/store-ip-address');
const ip = require('ip');
const Timeout = require('koa-better-timeout');
const Logger = require('@ladjs/logger');
// const Mongoose = require('@ladjs/mongoose');
const Graceful = require('@ladjs/graceful');

const config = require('./config/environment-config');
const helpers = require('./helpers');

// React
const reactRouter = require('./server/middlewares/react-router');

const AppLayout = require('./src/AppLayout');

// Frontend
const templateRenderer = require('./src/shared/template');
const mainAppData = require('./src/shared/app-data/main');

const logger = new Logger({
  ...helpers.logger.config,
});

// initialize the app
const app = new Koa();

let server;

app.on('error', logger.contextError);
app.on('log', logger.log);

// compress/gzip
app.use(compress());

// serve static assets
// TODO: <https://github.com/tunnckoCore/koa-better-serve/issues/13>
app.use(serveStatic(config.buildDir, config.serveStatic));

// override koa's undocumented error handler
app.context.onerror = errorHandler;

// response time
app.use(responseTime());

if (config.env === 'development') app.use(koaLogger());

// conditional-get
app.use(conditional());

// etag
app.use(etag());

// security
app.use(helmet());

// remove trailing slashes
app.use(removeTrailingSlashes());

// body parser
app.use(bodyParser());

// add context helpers
app.use(helpers.contextHelpers);

// 404 handler
app.use(koa404Handler);


// configure timeout
app.use(async (ctx, next) => {
  try {
    const timeout = new Timeout({
      ms: config.webRequestTimeoutMs,
      message: 'Oh No! Timeout',
    });
    await timeout.middleware(ctx, next);
  } catch (err) {
    ctx.throw(err);
  }
});

// /* routes
// React Router V4 middleware
// It will SSR our web routes which will interpret the requested route
app.use(reactRouter({
  appData: mainAppData,
  Layout: AppLayout,
  onError: (ctx, err) => console.log('I Have failed!!!!', err),
  onRedirect: (ctx, redirect) => ctx.redirect(redirect),
  onRender: () => ({ templateRenderer }),
}));

// start server on either http or https
if (config.protocols.web === 'http') server = http.createServer(app.callback());
else server = https.createServer(config.ssl.web, app.callback());

if (!module.parent) {
  server = server.listen(config.ports.web, () => {
    logger.info(`api server listening on ${config.ports
      .web} (LAN: ${ip.address()}:${config.ports.web})`);
    logger.info(`web server listening on ${config.ports
      .web} (LAN: ${ip.address()}:${config.ports.web})`);
  });
}

// handle process events and graceful restart
const graceful = new Graceful({
  // mongoose,
  server,
  // redisClient,
  logger,
});
graceful.listen();

module.exports = server;
