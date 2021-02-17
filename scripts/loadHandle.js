const config = require("../config.json");

module.exports = async ( handle ) => {
    const https = require('https')
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

            if(data.status == "OK") return "data.result[0].rank";
            else console.log("Esse user não existe.");
        });
    })

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();

    return "newbie";
}