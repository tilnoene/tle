const { add } = require('date-fns');

module.exports = async ( guild, message ) => {
  if (!guild) {
    throw new Error('Guild does not exist');
  }
  
  if (!message) {
    throw new Error('Message does not exist');
  }

  const lines = message.content.split('\n');

  if (lines.length >= 4) {
    try {
      const name = lines[0].split('] ')[1];
      const location = lines[3].split(': ')[1];

      const date = lines[0].split('] ')[0].split(' - ')[0].substring(1);
      const dateParts = date.split('/');

      const startTime = lines[1].split(': ')[1].split(':');
      const scheduledStartTime = add(
        new Date(dateParts[2], dateParts[1] - 1, dateParts[0], parseInt(startTime[0]), parseInt(startTime[1])),
        {
          hours: 3,
        }
      ); // YYYY-MM-DD HH:mm (month is 0-index based) e adicionado no formato GMT-3

      const duration = lines[2].split(' ')[1].split(':');
      const scheduledEndTime = add(
        scheduledStartTime, {
          hours: parseInt(duration[0]),
          minutes: parseInt(duration[1]),
        }
      );

      await guild.scheduledEvents.create({
        name,
        scheduledStartTime: scheduledStartTime.toString(),
        scheduledEndTime: scheduledEndTime.toString(),
        privacyLevel: 2,
        entityType: 'EXTERNAL',
        entityMetadata: { location },
        description: `Adicionado manualmente por ${message.author.username}`,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

/*
  [MM/DD/YYYY - Dia (dia opcional)] Nome
  Início: h:mm
  Duração: h:mm
  Link: url
  as outras linhas são ignorados
*/
