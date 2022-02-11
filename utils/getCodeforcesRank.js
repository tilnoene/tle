const axios = require('axios');

const config = require('../config.json');

module.exports = async ( handle ) => {
  let dataResult = {
    rank: 0,
    rating: 'unrated'
  };

  await axios.get(`http://${config.api_codeforces}/api/user.info?handles=${handle}`)
    .then(response => response.data)
    .then(data => data.result[0])
    .then(result => {
      dataResult.rank = result.rank || 0;
      dataResult.rating = result.rating || 'unrated';
    })
    .catch(() => {
      // console.log(`[Codeforces] User with handle ${handle} not found.`)
    });
  
  return dataResult;
}