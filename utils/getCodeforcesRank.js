const axios = require('axios');

const config = require('../config.json');
const logger = require('./logger');

module.exports = async ( handle ) => {
  let dataResult = {
    rating: 0,
    rank: 'unrated-cf'
  };

  await axios.get(`http://${config.api_codeforces}/api/user.info?handles=${handle}`)
    .then(response => response.data)
    .then(data => data.result[0])
    .then(result => {
      dataResult.rating = result.rating || 0;
      dataResult.rank = result.rank || 'unrated-cf';
    })
    .catch(() => {
      logger.debug(`[Codeforces] User with handle ${handle} not found.`)
    });
  
  return dataResult;
}