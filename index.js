const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const updateRank = require('./utils/updateRank');

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

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
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

client.on('messageCreate', async message => {
	if (!message.author.bot && message.guild) {
		// updateRank(message.guild, message.member);
		// message.reply('Nathália Chata');
	}
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
  updateRank(newMember.guild, newMember);
});

client.on('guildMemberAdd', member => {
  updateRank(member.guild, member);
});

client.login(process.env.DISCORD_TOKEN);