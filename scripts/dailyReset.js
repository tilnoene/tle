const sleep = require('./sleep');
const updateRank = require('./updateRank');

module.exports = async ( guild ) => {
    guild.members.fetch()
        .then(async users => {
            for (const user of users) {
                await updateRank(guild, user[1]);
                sleep(500);
            }
        })
        .catch(error => console.log(`[ERROR] ${error}`))
}