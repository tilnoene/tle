const config = require("../config.json");

const updateRank = require("../scripts/updateRank");

module.exports = async ( client, msg ) => {
    updateRank(msg.guild, msg.member);
    
    msg.reply(`seu ranking foi atualizado com sucesso!`);
}