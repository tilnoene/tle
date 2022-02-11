const axios = require('axios');

const config = require('../config.json');

// não funciona
module.exports = async ( handle ) => {
  let predict = {
    oldRating: 0,
    newRating: 0,
    status: 'FAIL',
  }
  
  await axios.get(`https://${config.api_predictor}/GetPartialRatingChangesServlet?contestId=${contest_id}&handles=${handle}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      // console.log(`[AtCoder] O usuário ${handle} não existe.`)
    });

  return predict;
}