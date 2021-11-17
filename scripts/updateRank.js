const config = require('../config.json');

const getCodeforcesData = require('./getCodeforcesData');
const getAtcoderData = require('./getAtcoderData');
const getAtcoderRankName = require('./getAtcoderRankName');
const getHandles = require('./getHandles');

module.exports = async ( guild, user ) => {
  const codeforces_ranks = config.codeforces_ranks;
  const atcoder_ranks = config.atcoder_ranks;
  
  const serverRoles = guild.roles.cache;
  const userRoles = user.roles.cache || user._roles;
  
  const handles = getHandles(user.nickname || user.user.username);
  
  // Codeforces rank
  await getCodeforcesData(handles.codeforces)
    .then(data => data.rank)
    .then(rank => {
      // search role with same name in server
      const role = serverRoles.find(currentRole => (
        currentRole.name.toLowerCase() === rank
      ));
      
      if (role) {
        // verify if user already have this rule
        const alreadyHaveRole = userRoles.find(currentRole => (
          currentRole.name.toLowerCase() === rank
        ));
          
        if (!alreadyHaveRole) {
          // remove the old role
          user.roles._roles.map(currentRole => {
            if (codeforces_ranks.includes(currentRole.name.toLowerCase()) && currentRole !== role)
              user.roles.remove(currentRole);
          });
            
          user.roles.add(role).catch(error => console.error(`[ADD ROLE] ${error}`));
        }
      }
    })
    .catch(error => console.error(`[GET CF RANK] ${error}`));
    
  // AtCoder rank
  await getAtcoderData(handles.atcoder)
    .then(rating => getAtcoderRankName(rating).toUpperCase())
    .then(rank => {
      const role = serverRoles.find((role) => {
        return role.name.toUpperCase() === rank
      });
      
      // remove current roles and add the new role
      if(role) {
        user.roles._roles.map((currentRole) => {
          if (atcoder_ranks.includes(currentRole.name.toLowerCase()) && currentRole !== role)
            user.roles.remove(currentRole);
        });
        
        user.roles.add(role);
      }
    });
}