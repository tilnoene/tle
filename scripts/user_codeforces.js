const config = require("../config.json");

const getRank = async ( handle ) => {
    const https = require('https');
    const options = {
        hostname: config.api_codeforces,
        path: `/api/user.info?handles=${handle}`,
        method: 'GET'
    }

    let data = "", rank = "newbie";
    const req = await https.request(options, (res) => {
        if(config.debug) console.log(`statusCode: ${res.statusCode}`);

        res.on("data", d => {
            data += d;
        });

        res.on("end", () => {
            data = JSON.parse(data);

            if(data.status == "OK") {
                rank = data.result[0].rank;
                return rank;
            } else {
                console.log("Esse user não existe.");
            }
        });
    })

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
}

exports.getRank = getRank;