const axios = require('axios');

const config = require('../config.json');

module.exports = async ( guild ) => {
  if (!guild) return;
  
  const contestsCodeforces = await axios.get(`http://${config.api_upcoming_contests}/codeforces`);
  const contestsAtcoder = await axios.get(`http://${config.api_upcoming_contests}/at_coder`);

  const contests = [
    ...(contestsCodeforces.data.filter(contest => !contest.name.includes('Kotlin'))), // Codeforces: exceto contests "Kotlin Heroes"
    ...(contestsAtcoder.data.filter(contest => contest.name.includes('Beginner'))), // AtCoder: somente ABC
  ].map(contest => {
    return {
      ...contest,
      name: contest.name.slice(0, 64), // limite de caracteres para o nome de um evento
    }
  });

  let serverScheduledEvents = guild.scheduledEvents.cache;

  // adiciona os contests ao servidor
  contests.forEach(contest => {
    // verifica se já existe um evento agendado com esse nome e foi criado pelo bot
    if (!serverScheduledEvents.some(scheduledEvent => {
      if (scheduledEvent.creator) {
        return scheduledEvent.name === contest.name && scheduledEvent.creator.bot;
      }

      return scheduledEvent.name === contest.name;
    })) {
      guild.scheduledEvents.create({
        name: contest.name,
        scheduledStartTime: contest.start_time,
        scheduledEndTime: contest.end_time,
        privacyLevel: 2,
        entityType: 'EXTERNAL',
        // description: 'Codeforces',
        entityMetadata: { location: contest.url },
      });
    }
  });

  // deleta contests do servidor que não existem nos contests oficiais da API (evitar duplicadas, modificações)
  serverScheduledEvents = guild.scheduledEvents.cache;

  serverScheduledEvents.forEach(scheduledEvent => {
    if (!contests.some(contest => contest.name === scheduledEvent.name)) {
      scheduledEvent.delete();
    }
  });
}