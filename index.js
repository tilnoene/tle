const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { CronJob } = require('cron');

const updateRank = require('./utils/updateRank');
const resetAllUsersRank = require('./utils/resetAllUsersRank');
const scheduleContestEvents = require('./utils/scheduleContestEvents');
const scheduleEventMessage = require('./utils/scheduleEventMessage');
const getCurrentTime = require('./utils/getCurrentTime');
const sleep = require('./utils/sleep');

require('./deploy-commands');
require('dotenv').config();

const keepAlive = require('./server');

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MEMBERS, 
	Intents.FLAGS.GUILD_PRESENCES, 
	Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
	Intents.FLAGS.GUILD_SCHEDULED_EVENTS, 
] });

// adiciona os comandos
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// reinicia o handle de todos os usuários a cada 1 hora
// também verifica se há contests para adicionar aos eventos
const resetAllUsers = new CronJob('0 */1 * * *', () => {
  console.log(`${getCurrentTime()} Resetting all handles...`);
  
  const guild = client.guilds.cache.get(process.env.SERVER_ID);

  resetAllUsersRank(guild);
	scheduleContestEvents(guild);
});

resetAllUsers.start();

client.once('ready', () => {
	console.log(`${getCurrentTime()} Bot is ready!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'select') {
		await interaction.deferUpdate();
		await sleep(4000);
		await interaction.editReply({ content: 'Something was selected!', components: [] });
	}
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  updateRank(newMember.guild, newMember);
});

client.on('guildMemberAdd', member => {
  updateRank(member.guild, member);
});

client.on('messageCreate', async message => {
	if (message.channelId === process.env.CONTEST_CHANNEL_ID) {
		try {
			const guild = client.guilds.cache.get(process.env.SERVER_ID);

			scheduleEventMessage(guild, message);
			message.react('✅');
		} catch (error) {
			console.error(error);

			message.react('❌');
		}
	}
});

client.login(process.env.DISCORD_TOKEN);

keepAlive();