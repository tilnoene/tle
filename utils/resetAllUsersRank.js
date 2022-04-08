const sleep = require('./sleep');
const updateRank = require('./updateRank');

module.exports = async ( guild ) => {
  return;
  guild.members.fetch()
    .then(async users => {
      for (const user of users) {
        // if (user[1].user.bot) continue;
        await updateRank(guild, user[1]);
        sleep(1000);
      }
    })
    // .catch(error => console.log(`${getCurrentTime} [ERROR] ${error}`));
}