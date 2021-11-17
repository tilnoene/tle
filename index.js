const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE'] });

const cron = require('cron');

require('dotenv').config();

const commands = require('./scripts/commandsReader')(process.env.PREFIX);
const getCurrentTime = require('./scripts/getCurrentTime');

const unknowCommand = require('./scripts/unknowCommand');
const resetAllHandles = require('./scripts/resetAllHandles');
const updateRank = require('./scripts/updateRank');

// [second, minute, hour, day, month, day_of_week] eg. 0AM = '00 00 00 * * *'
// reset handle and university of all users every 1 hour
const resetAllUsers = new cron.CronJob('* */1 * * *', () => {
  console.log(`${getCurrentTime()} Resetting all handles...`);
  
  const guild = client.guilds.cache.get(process.env.SERVER_ID);

  resetAllHandles(guild);
});

resetAllUsers.start();

client.on('ready', () => {
  console.log('BOT is online!');
});

client.on('message', message => {
  // não é uma mensagem do próprio bot e é uma mensagem em um servidor
  if (!message.author.bot && message.guild) {
    const args = message.content.split(' ');
    
    if (commands[args[0]])
      commands[args[0]](client, message);
    else if (Number.isInteger(parseInt(args[0]))) // é um número negativo (ex: -1), então não interpretar como comando desconhecido
      return;
    else if (args[0].split('')[0] == process.env.PREFIX)
      unknowCommand(message);
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  updateRank(newMember.guild, newMember);
});

client.on('guildMemberAdd', member => {
  updateRank(member.guild, member);
});

client.on('messageReactionAdd', (reaction, user) => {
  console.log('oi');
});

client.login(process.env.DISCORD_TOKEN);