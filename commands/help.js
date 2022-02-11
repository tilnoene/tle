const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Comandos e informações sobre o Bot.'),
	async execute(interaction) {
		const commands = [];
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			commands.push({ name: `/${command.data.name}`, value: command.data.description });
		}

		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('TLE')
			.setURL('https://github.com/tilnoene')
			.setThumbnail('https://i.imgur.com/2pszr35.jpg')
			.setAuthor({ name: 'tilnoene', iconURL: 'https://github.com/tilnoene.png', url: 'https://github.com/tilnoene/tle' })
			.setDescription('Bot para programação competitiva')
			.addFields(commands)
			.setTimestamp()
			.setFooter({ text: 'BFS > DFS' });

		return interaction.reply({ embeds: [exampleEmbed] });
	},
};