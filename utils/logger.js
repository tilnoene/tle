const pino = require('pino');

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true, translateTime: true }
});

const logger = pino({ level: 'info' }, transport);

module.exports = logger;
