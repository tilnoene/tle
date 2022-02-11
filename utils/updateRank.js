const config = require('../config.json');

const getHandles = require('./getHandles');
const getCodeforcesRank = require('./getCodeforcesRank');
const getAtcoderRank = require('./getAtcoderRank');

module.exports = async ( guild, member ) => {
  const codeforces_ranks = config.codeforces_ranks;
  const atcoder_ranks = config.atcoder_ranks;

  const serverRoles = guild.roles.cache;
  const handles = getHandles(member.nickname || member.user.username);
  
  const memberCodeforcesRank = await getCodeforcesRank(handles.codeforces);
  const memberAtcoderRank = await getAtcoderRank(handles.atcoder);

  codeforces_ranks.forEach(rank => {
    // remove a handle
    if (member.roles.cache.some(role => role.name.toLowerCase() === rank) && rank !== memberCodeforcesRank.rank) {
      member.roles.remove(serverRoles.find((role, key) => role.name.toLowerCase() === rank));
    }
  });

  if (!member.roles.cache.some(role => role.name.toLowerCase() === memberCodeforcesRank.rank)) {
    member.roles.add(serverRoles.find((role, key) => role.name.toLowerCase() === memberCodeforcesRank.rank));
  }

  atcoder_ranks.forEach(rank => {
    // remove a handle
    if (member.roles.cache.some(role => role.name.toLowerCase() === rank) && rank !== memberAtcoderRank.rank) {
      member.roles.remove(serverRoles.find((role, key) => role.name.toLowerCase() === rank));
    }
  });

  if (!member.roles.cache.some(role => role.name.toLowerCase() === memberAtcoderRank.rank))
    member.roles.add(serverRoles.find((role, key) => role.name.toLowerCase() === memberAtcoderRank.rank));
}