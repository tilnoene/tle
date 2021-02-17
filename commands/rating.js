const config = require("../config.json");
//const rating_codeforces = require("../scripts/rating_codeforces");

module.exports = async ( client, msg ) => {
    const handle = msg.content.split(" ")[1];

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

            if(data.status == "OK") {
                let rating = data.result[0].rating;
                msg.channel.send(`[ ${handle} ]\nrating: ${rating} (${data.result[0].rank})`);
            } else {
                console.log("Esse user não existe.");
                msg.channel.send("esse usuário não existe!");
            }

        });
    })

    req.on('error', (error) => {
        console.error(error);
    });
    
    req.end();
}