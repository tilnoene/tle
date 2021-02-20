const config = require("../config.json");

const getCodeforcesData = require("../scripts/getCodeforcesData");
const getAtcoderData = require("../scripts/getAtcoderData");
const getAtcoderRankName = require("../scripts/getAtcoderRankName");

module.exports = async ( client, msg ) => {
    const codeforces_ranks = config.codeforces_ranks;
    const atcoder_ranks = config.atcoder_ranks;

    const serverRoles = msg.guild.roles.cache;
    const member = msg.member;
    const nickname = msg.guild.member(msg.author).nickname;
    const handle = nickname ? nickname : msg.author.username;

    // Codeforces rank
    await getCodeforcesData(handle)
        .then(response => response.result[0].rank.toUpperCase())
        .then(rank => {
            const role = serverRoles.find((role) => {
                return role.name.toUpperCase() === rank
            });

            // Remove actual roles and add the new role
            if(role) {
                member.roles._roles.map((currentRole) => {
                    if (codeforces_ranks.includes(currentRole.name.toLowerCase()) && currentRole !== role) {
                        member.roles.remove(currentRole);
                    }
                })
                
                member.roles.add(role);
            }
        });
    
    // AtCoder rank
    await getAtcoderData(handle)
        .then(rating => getAtcoderRankName(rating).toUpperCase())
        .then(rank => {
            const role = serverRoles.find((role) => {
                return role.name.toUpperCase() === rank
            });

            // Remove actual roles and add the new role
            if(role) {
                member.roles._roles.map((currentRole) => {
                    if (atcoder_ranks.includes(currentRole.name.toLowerCase()) && currentRole !== role) {
                        member.roles.remove(currentRole);
                    }
                })
                
                member.roles.add(role);
            }
        });
    
    msg.reply(`seu ranking foi currentizado com sucesso!`);
}