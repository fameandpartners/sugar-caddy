const Logger = require('@ladjs/logger');
const config = require('./');

const logger = new Logger(config.logger);

module.exports = logger;
