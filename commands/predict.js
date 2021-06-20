const getPredict = require('../scripts/getPredict');

module.exports = async ( client, msg ) => {
    let handle = msg.content.split(' ')[1];

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

    // Predictor
    await getPredict(handle)
        .then(data => {
            if (data.status === 'OK' && data.oldRating) {
                const ratingChange = data.newRating - data.oldRating;

                msg.channel.send(`user: ${handle}\n${ratingChange >= 0 ? '+' : ''}${ratingChange} (${data.oldRating} -> ${data.newRating})`);
            } else {
                msg.channel.send(`O usuário ${handle} não está participando ou participou do contest.`);
            }
        })
        .catch(error => {
            console.log(`[Predictor] An error occurred while processing the handle ${handle}`)
            msg.channel.send(`Ocorreu um erro ao processar o usuário ${handle}`);
        });
    
    
}