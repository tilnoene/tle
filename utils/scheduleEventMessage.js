const moment = require('moment');

/*
  [MM/DD/YYYY - Dia (dia opcional)] Nome
  Início: h:mm
  Duração: h:mm
  Link: url
  as outras linhas são ignorados
*/

module.exports = async ( guild, message ) => {
  const lines = message.content.split('\n');

  if (lines.length >= 4) {
    const name = lines[0].split('] ')[1];
    const location = lines[3].split(': ')[1];

    const date = lines[0].split('] ')[0].split(' - ')[0].substring(1);
    
    const scheduledStartTime = moment(`${date} ${lines[1].split(' ')[1]}`, 'DD/MM/YYYY hh:mm');
    const scheduledEndTime = moment(scheduledStartTime);

    const duration = lines[2].split(' ')[1].split(':');
    scheduledEndTime.add(parseInt(duration[0]), 'hours'); // end = start + duration
    scheduledEndTime.add(parseInt(duration[1]), 'minutes');

    guild.scheduledEvents.create({
      name,
      scheduledStartTime: scheduledStartTime.toString(),
      scheduledEndTime: scheduledEndTime.toString(),
      privacyLevel: 2,
      entityType: 'EXTERNAL',
      entityMetadata: { location },
    });
  }
}

