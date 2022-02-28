const axios = require('axios');
const cheerio = require('cheerio');

const config = require('../config.json');

const getAtcoderRankName = require('./getAtcoderRankName');

module.exports = async ( handle ) => {
  let rating = 0;

  await axios.get(`http://${config.api_atcoder}/users/${handle}`)
    .then(response => cheerio.load(response.data))
    .then($ => {
      $('#main-container > div.row > div.col-md-9.col-sm-12 > table > tbody > tr:nth-child(2)').each((index, element) => {
        rating = parseInt($(element).text().slice(6));
      });
    })
    .catch(error => {
      // console.log(`[AtCoder] O usuário ${handle} não existe.`)
    });

  return {
    rating,
    rank: getAtcoderRankName(rating)
  };
}