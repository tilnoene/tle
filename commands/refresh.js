const config = require("../config.json");
const user_codeforces = require("../scripts/user_codeforces");

module.exports = async ( client, msg ) => {
    const ranks = config.ranks;
    
    const serverRoles = msg.guild.roles.cache;

    /*await user_codeforces.getRank("Tilnoene")
        .then(rank => {
            console.log(rank);
        });*/

    const member = msg.member;
    const nickname = msg.guild.member(msg.author).nickname;
    const handle = nickname ? nickname : msg.author.username;

    const https = require('https');
    const options = {
        hostname: config.api_codeforces,
        path: `/api/user.info?handles=${handle}`,
        method: 'GET'
    }
    
    let data = "";
    const req = await https.request(options, (res) => {
        if(config.debug) console.log(`statusCode: ${res.statusCode}`);
    
        res.on("data", d => {
            data += d;
        });
    
        res.on("end", () => {
            data = JSON.parse(data);
            let rank = "newbie";

            if(data.status == "OK") {
                rank = data.result[0].rank;
            } else {
                console.log("Esse user não existe.");
            }

            rank = rank.toUpperCase();

            if (config.debug) {
                console.log(rank);
                console.log(handle);
            }

            const role = serverRoles.find((role) => {
                return role.name.toUpperCase() === rank
            });
            
            if(role) {
                member.roles._roles.map((atualRole) => {
                    if (ranks.includes(atualRole.name.toLowerCase()) && atualRole !== role) {
                        member.roles.remove(atualRole);
                    }
                })
                
                member.roles.add(role);

                msg.reply(`seu ranking foi atualizado com sucesso!`);
            }

        });
    })

    req.on('error', (error) => {
        console.error(error);
    });
    
    req.end();
}