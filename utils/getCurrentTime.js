const { format } = require('date-fns');

module.exports = () => {
  return format(
    new Date(), 
    '[dd/mm/yyyy HH:mm:ss]',
  );
}