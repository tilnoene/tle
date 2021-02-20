const updateRank = require("./updateRank.js");

module.exports = async ( guild ) => {
    guild.members.fetch()
        .then(users => {
            users.forEach(user => {
                updateRank(guild, user);
            })
        })
        .catch(console.error);
}