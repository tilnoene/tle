const config = require("../config.json");

const getCodeforcesData = require("../scripts/getCodeforcesData");
const getAtcoderData = require("../scripts/getAtcoderData");
const getAtcoderRankName = require("../scripts/getAtcoderRankName");

module.exports = async ( client, msg ) => {
    const handle = msg.content.split(" ")[1];
    let message = "";

    // Codeforces rating
    await getCodeforcesData(handle)
        .then(data => {
            if (config.debug) console.log(data);

            if (data.status === "OK") {
                const codeforces_data = data.result[0];
                const codeforces_name = "`[Codeforces]`";

                if (codeforces_data.rating) {
                    message += `\n${codeforces_name} ${codeforces_data.rating} (${codeforces_data.rank})`;
                } else {
                    message += `\n${codeforces_name} unrated`;
                }
            }
        })
        .catch(error => console.log(`[Codeforces] O usuário ${handle} não existe.`));
    
    // AtCoder rating
    await getAtcoderData(handle)
        .then(atcoder_rating => {
            const atcoder_name = "`[AtCoder]`";

            if (atcoder_rating)
                message += `\n${atcoder_name} ${atcoder_rating} (${getAtcoderRankName(atcoder_rating)})`;
        });
    
    if (message.length === 0)
        message = "\nNenhum dado foi encontrado para esse usuário.";
    
    msg.channel.send(`user: ${handle}` + message);
}