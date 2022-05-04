const sleep = require('./sleep');
const updateRank = require('./updateRank');

module.exports = async ( guild ) => {
  guild.members.fetch()
    .then(async users => {
      for (const user of users) {
        // if (user[1].user.bot) continue;

        try {
          await updateRank(guild, user[1]);
        } catch (error) {
          throw error;
        }
        
        sleep(1000);
      }
    })
    .catch(error => {
      throw error;
    });
}