const { add } = require('date-fns');

module.exports = async ( guild, message ) => {
  const lines = message.content.split('\n');

  if (lines.length >= 4) {
    try {
      const name = lines[0].split('] ')[1];
      const location = lines[3].split(': ')[1];

      const date = lines[0].split('] ')[0].split(' - ')[0].substring(1);
      const dateParts = date.split('/');

      const startTime = lines[1].split(': ')[1].split(':');
      const scheduledStartTime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], parseInt(startTime[0]), parseInt(startTime[1])); // YYYY-MM-DD HH:mm (month is 0-index based)
      
      const duration = lines[2].split(' ')[1].split(':');
      const scheduledEndTime = add(
        scheduledStartTime, {
          hours: parseInt(duration[0]),
          minutes: parseInt(duration[1]),
        }
      );

      guild.scheduledEvents.create({
        name,
        scheduledStartTime: scheduledStartTime.toString(),
        scheduledEndTime: scheduledEndTime.toString(),
        privacyLevel: 2,
        entityType: 'EXTERNAL',
        entityMetadata: { location },
      });
    } catch(err) {
      console.error(error);
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
