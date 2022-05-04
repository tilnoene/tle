const config = require('../config.json');

const getHandles = require('./getHandles');
const getCodeforcesRank = require('./getCodeforcesRank');
const getAtcoderRank = require('./getAtcoderRank');
const logger = require('./logger');

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
      const serverRole = serverRoles.find((role) => role.name.toLowerCase() === rank);

      if (serverRole) {
        member.roles.remove(serverRole);
      } else {
        logger.error(`Role for Codeforces rank ${rank} does not exist on server`);
      }
    }
  });

  if (!member.roles.cache.some(role => role.name.toLowerCase() === memberCodeforcesRank.rank)) {
    const serverRole = serverRoles.find((role) => role.name.toLowerCase() === memberCodeforcesRank.rank);

    if (serverRole) {
      member.roles.add(serverRole);
    } else {
      logger.error(`Role for Codeforces rank ${memberCodeforcesRank.rank} does not exist on server`);
    }
  }

  atcoder_ranks.forEach(rank => {
    // remove a handle
    if (member.roles.cache.some(role => role.name.toLowerCase() === rank) && rank !== memberAtcoderRank.rank) {
      const serverRole = serverRoles.find((role) => role.name.toLowerCase() === rank);

      if (serverRole) {
        member.roles.remove(serverRole);
      } else {
        logger.error(`Role for AtCoder rank ${rank} does not exist on server`);
      }
    }
  });

  if (!member.roles.cache.some(role => role.name.toLowerCase() === memberAtcoderRank.rank)) {
    const serverRole = serverRoles.find((role, key) => role.name.toLowerCase() === memberAtcoderRank.rank);

    if (serverRole) {
      member.roles.add(serverRole);
    } else {
      logger.error(`Role for AtCoder rank ${memberAtcoderRank.rank} does not exist on server`);
    }
  }
}