const request = require("request-promise");
const cheerio = require("cheerio");

const config = require("../config.json");

module.exports = async ( handle ) => {
    let result = 0;

    await request.get(`http://${config.api_atcoder}/users/${handle}`)
        .then(response => cheerio.load(response))
        .then($ => {
            if (config.debug) console.log($);

            $("#main-container > div.row > div.col-md-9.col-sm-12 > table > tbody > tr:nth-child(2)").each((index, element) => {
                result = parseInt($(element).text().slice(6));
            });
        })
        .catch(error => console.log(`[AtCoder] O usuário ${handle} não existe.`));
    
    return result;
}