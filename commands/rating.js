const getCodeforcesRank = require('../scripts/getCodeforcesData');
const getAtcoderData = require('../scripts/getAtcoderData');
const getAtcoderRankName = require('../scripts/getAtcoderRankName');
const getHandles = require('../scripts/getHandles');

module.exports = async ( client, msg ) => {
  let allHandles = msg.content.split(' ');
  
  // somente o comando -rating
  if (allHandles.length === 1) { 
    const username = msg.author.username;
    let nickname = undefined;
    
    const guild = client.guilds.cache.get(process.env.SERVER_ID);
    guild.members.cache.map(user => {
      // procura o nome do usuário (no servidor) que enviou a mensagem
      if (user.user.username === username)
        nickname = user.nickname;
    });
    
    allHandles.push(nickname || username);
  }
  
  let message = '';

  for (let i = 1; i < allHandles.length; i++) {
    if (i > 1) message += '\n\n';

    handle = getHandles(allHandles[i]);
    message += `user: ${handle.codeforces}/${handle.atcoder}`

    // Codeforces rating
    await getCodeforcesRank(handle.codeforces)
      .then(data => {
        const codeforces_data = data;
        const codeforces_name = '`[Codeforces]`';
        
        if (codeforces_data.rating)
          message += `\n${codeforces_name} ${codeforces_data.rating} (${codeforces_data.rank})`;
        else
          message += `\n${codeforces_name} unrated`;
      })
      .catch(error => console.log(`[Codeforces] O usuário ${handle.codeforces} não existe.`));
    
    // AtCoder rating
    await getAtcoderData(handle.atcoder)
      .then(atcoder_rating => {
        const atcoder_name = '`[AtCoder]`';
        
        if (atcoder_rating)
          message += `\n${atcoder_name} ${atcoder_rating} (${getAtcoderRankName(atcoder_rating)})`;
        else
          message += `\n${atcoder_name} unrated (unrated)`;
      })
      .catch(error => console.log(`[AtCoder] O usuário ${handle.atcoder} não existe.`));
  }

  msg.channel.send(message);
}