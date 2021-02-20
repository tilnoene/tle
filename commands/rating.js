const request = require("request-promise");
const cheerio = require("cheerio");

const config = require("../config.json");

//const rating_codeforces = require("../scripts/rating_codeforces");
const getAtcoderRankName = require("../scripts/getAtcoderRankName");

module.exports = async ( client, msg ) => {
    const handle = msg.content.split(" ")[1];
    let message = `user: ${handle}`;

    // Codeforces rating
    await request.get(`http://${config.api_codeforces}/api/user.info?handles=${handle}`)
        .then(response => JSON.parse(response))
        .then(data => {
            if (config.debug) console.log(data);

            if (data.status === "OK") {
                const codeforces_data = data.result[0];
                const codeforces_name = "`[Codeforces]`";
                message += `\n${codeforces_name} ${codeforces_data.rating} (${codeforces_data.rank})`;
            }
        })
        .catch(error => console.log(`[Codeforces] O usuário ${handle} não existe.`));

    // AtCoder rating
    await request.get(`http://${config.api_atcoder}/users/${handle}`)
        .then(response => cheerio.load(response))
        .then($ => {
            if (config.debug) console.log($);

            $('#main-container > div.row > div.col-md-9.col-sm-12 > table > tbody > tr:nth-child(2)').each((index, element) => {
                const atcoder_rating = parseInt($(element).text().slice(6));
                const atcoder_name = "`[AtCoder]`";
                message += `\n${atcoder_name} ${atcoder_rating} (${getAtcoderRankName(atcoder_rating)})`;
            });
        })
        .catch(error => console.log(`[AtCoder] O usuário ${handle} não existe.`));

    msg.channel.send(message);
}