const getCodeforcesRank = require('../scripts/getCodeforcesData');
const getAtcoderData = require('../scripts/getAtcoderData');
const getAtcoderRankName = require('../scripts/getAtcoderRankName');

module.exports = async ( client, msg ) => {
    let handle = msg.content.split(' ')[1];
    let message = '';

    if (!handle) {
        const username = msg.author.username;
        let nickname = undefined;

        const guild = client.guilds.cache.get(process.env.SERVER_ID);
        guild.members.cache.map(user => {
            if (user.user.username === username) {
                nickname = user.nickname;
            }
        })

        handle = nickname ? nickname : username;
    }

    // Codeforces rating
    await getCodeforcesRank(handle)
        .then(data => {
            const codeforces_data = data;
            const codeforces_name = '`[Codeforces]`';

            if (codeforces_data.rating) {
                message += `\n${codeforces_name} ${codeforces_data.rating} (${codeforces_data.rank})`;
            } else {
                message += `\n${codeforces_name} unrated`;
            }
        })
        .catch(error => console.log(`[Codeforces] O usuário ${handle} não existe.`));
    
    // AtCoder rating
    await getAtcoderData(handle)
        .then(atcoder_rating => {
            const atcoder_name = '`[AtCoder]`';

            if (atcoder_rating)
                message += `\n${atcoder_name} ${atcoder_rating} (${getAtcoderRankName(atcoder_rating)})`;
            else
                message += `\n${atcoder_name} unrated (unrated)`;
        })
        .catch(error => console.log(`[AtCoder] O usuário ${handle} não existe.`));

    msg.channel.send(`user: ${handle}` + message);
}