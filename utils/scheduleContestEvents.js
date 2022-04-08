const sleep = require('./sleep');
const axios = require('axios');

const config = require('../config.json');

module.exports = async ( guild ) => {
  if (!guild) return;
  
  // codeforces
  await axios.get(`http://${config.api_upcoming_contests}/codeforces`)
    .then(response => {
      for (const contest of response.data) {
        // não adiciona Kotlin Heroes
        if (contest.name.includes('Kotlin')) continue;

        // verifica se já existe um evento agendado com esse nome

        const serverScheduledEvents = guild.scheduledEvents.cache;

        if (!serverScheduledEvents.some(scheduledEvent => scheduledEvent.name === contest.name)) {
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
      }
    })

  // atcoder
  await axios.get(`http://${config.api_upcoming_contests}/at_coder`)
  .then(response => {
    for (const contest of response.data) {
      // adicionar somente os AtCoder Beginner Contest
      if (!contest.name.includes('Beginner')) continue;
      
      let contestName = contest.name;
      if (contest.name.length >= 60)
        contestName = contest.name.substr(0, 61);

      // verifica se já existe um evento agendado com esse nome
      const serverScheduledEvents = guild.scheduledEvents.cache;

      if (!serverScheduledEvents.some(scheduledEvent => scheduledEvent.name === contestName)) {
        guild.scheduledEvents.create({
          name: contestName,
          scheduledStartTime: contest.start_time,
          scheduledEndTime: contest.end_time,
          privacyLevel: 2,
          entityType: 'EXTERNAL',
          // description: 'AtCoder',
          entityMetadata: { location: contest.url },
        });
      }
    }
  })
}