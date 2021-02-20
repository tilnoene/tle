const request = require("request-promise");

const config = require("../config.json");

module.exports = async ( handle ) => {
    let result = { status: "FAILED" };

    await request.get(`http://${config.api_codeforces}/api/user.info?handles=${handle}`)
        .then(response => result = JSON.parse(response))
        .catch(error => console.log(`[Codeforces] O usuário ${handle} não existe.`));
    
    return result;
}