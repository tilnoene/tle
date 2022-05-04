const axios = require('axios');

const config = require('../config.json');

module.exports = async ( guild ) => {
  if (!guild) return;
  
  const contestsCodeforces = await axios.get(`http://${config.api_upcoming_contests}/codeforces`);
  const contestsAtcoder = await axios.get(`http://${config.api_upcoming_contests}/at_coder`);

  const contests = [
    ...(contestsCodeforces.data.filter(contest => !contest.name.includes('Kotlin'))), // Codeforces: exceto contests "Kotlin Heroes"
    ...(contestsAtcoder.data.filter(contest => contest.name.includes('Beginner'))), // AtCoder: somente ABC
  ];

  // adiciona os contests ao servidor
  contests.forEach(contest => {
    let contestName = contest.name;
    if (contest.name.length >= 60) { // validar para o tamanho não ser maior do que o permitido pela API do Discord
      contestName = contest.name.substr(0, 61);
    }

    // verifica se já existe um evento agendado com esse nome e foi criado pelo bot
    const serverScheduledEvents = guild.scheduledEvents.cache;

    if (!serverScheduledEvents.some(scheduledEvent => scheduledEvent.name === contestName && scheduledEvent.creator.bot)) {
      guild.scheduledEvents.create({
        name: contestName,
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
  const serverScheduledEvents = guild.scheduledEvents.cache;

  serverScheduledEvents.forEach(scheduledEvent => {
    if (!contests.some(contest => contest.name == scheduledEvent.name)) {
      scheduledEvent.delete();
    }
  });
}