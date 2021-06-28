const axios = require('axios');

const config = require('../config.json');

module.exports = async ( contest_id ) => {
    let started = false;

    await axios.get(`https://${config.api_codeforces}/api/contest.status?contestId=${contest_id}&count=1`)
        .then(() => started = true)
        .catch(() => started = false);

    return started;
}