const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { CronJob } = require('cron');

const logger = require('./utils/logger');

const updateRank = require('./utils/updateRank');
const resetAllUsersRank = require('./utils/resetAllUsersRank');
const scheduleContestEvents = require('./utils/scheduleContestEvents');
const scheduleEventMessage = require('./utils/scheduleEventMessage');

require('./deploy-commands');
require('dotenv').config();

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MEMBERS, 
	Intents.FLAGS.GUILD_PRESENCES, 
	Intents.FLAGS.GUILD_MESSAGES, 
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
	Intents.FLAGS.GUILD_SCHEDULED_EVENTS, 
] });

// adiciona os comandos ao servidor
const registerCommands = async () => {
	try {
		client.commands = new Collection();
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			client.commands.set(command.data.name, command);
		}
	} catch (error) {
		logger.error('An error occurred while registering the commands');
		logger.error(error);
	}
}

// reinicia o handle de todos os usuários a cada 1 hora
const everyOneHour = new CronJob('0 */1 * * *', async () => {
	logger.info('Resetting all handles and schedule contest events...');
  
  const guild = client.guilds.cache.get(process.env.SERVER_ID);

	try {
		await resetAllUsersRank(guild);
		await scheduleContestEvents(guild);
	} catch (error) {
		logger.error(error);
	}
});

everyOneHour.start();

client.once('ready', () => {
	logger.info('Bot is ready!');

	client.user.setPresence({ activities: [{ name: '/help', type: 'STREAMING', url: 'https://www.twitch.tv/tiagobfs' }] /*, status: 'online'*/ });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error('An error occurred while executing a command');
		logger.error(error);

		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	try {
		await updateRank(newMember.guild, newMember);
	} catch (error) {
		logger.error(error);
	}
});

client.on('guildMemberAdd', async (member) => {
	try {
		await updateRank(member.guild, member);
	} catch (error) {
		logger.error(error);
	}
});

client.on('messageCreate', async message => {
	if (message.channelId === process.env.CONTEST_CHANNEL_ID) {
		try {
			const guild = client.guilds.cache.get(process.env.SERVER_ID);

			await scheduleEventMessage(guild, message);
			message.react('✅');
		} catch (error) {
			logger.error('There was an error adding the contest manually');
			logger.error(error);

			message.react('❌');
		}
	}
});

registerCommands();
client.login(process.env.DISCORD_TOKEN);
