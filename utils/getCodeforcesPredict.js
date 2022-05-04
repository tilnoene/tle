const axios = require('axios');

const config = require('../config.json');
const logger = require('./logger');

module.exports = async ( handle ) => {
  let predict = {
    oldRating: 0,
    newRating: 0,
    status: 'FAIL',
  }
  
  await axios.get(`https://${config.api_predictor}/GetPartialRatingChangesServlet?contestId=${contest_id}&handles=${handle}`)
    .then(response => {
      logger.debug(response.data);
    })
    .catch(() => {
      logger.debug(`[AtCoder] O usuário ${handle} não existe.`);
    });

  return predict;
}