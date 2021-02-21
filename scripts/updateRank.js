const config = require("../config.json");

const getCodeforcesData = require("../scripts/getCodeforcesData");
const getAtcoderData = require("../scripts/getAtcoderData");
const getAtcoderRankName = require("../scripts/getAtcoderRankName");

module.exports = async ( guild, member ) => {
    const codeforces_ranks = config.codeforces_ranks;
    const atcoder_ranks = config.atcoder_ranks;

    const serverRoles = guild.roles.cache;

    const nickname = member.nickname;
    const handle = nickname ? nickname : member.user.username;

    // Codeforces rank
    await getCodeforcesData(handle)
        .then(response => {
            rank = "NEWBIE";

            if (response.status === "OK") {
                rank = response.result[0].rank.toUpperCase();
            }

            const role = serverRoles.find((role) => {
                return role.name.toUpperCase() === rank
            });

            // Remove actual roles and add the new role
            if(role) {
                member.roles._roles.map((currentRole) => {
                    if (codeforces_ranks.includes(currentRole.name.toLowerCase()) && currentRole !== role) {
                        member.roles.remove(currentRole);
                    }
                });
                    
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
                });
                
                member.roles.add(role);
            }
        });
}