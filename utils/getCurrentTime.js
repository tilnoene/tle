const moment = require('moment');

module.exports = () => {
  return `[${moment().subtract(3, 'hours').format('DD/MM/YYYY HH:mm:ss')}]`;
}