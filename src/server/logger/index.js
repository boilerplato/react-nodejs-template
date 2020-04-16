const log4js = require('log4js');

log4js.configure({
  appenders: { out: { type: 'stdout', layout: { type: 'colored' } } },
  categories: { default: { appenders: ['out'], level: 'debug' } },
});

const logger = log4js.getLogger();
logger.level = 'info';

module.exports = logger;
