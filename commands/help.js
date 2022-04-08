const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Comandos e informações sobre o bot.'),
	async execute(interaction) {
		const commands = [];
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			
			const commandName = `/${command.data.name}${command.data.options.map(option => ` [${option.name}]`)}`; // adiciona os parâmetros do comando

			commands.push({ name: commandName, value: command.data.description });
		}

		const helpMessage = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('TLE')
			.setURL('https://github.com/tilnoene')
			.setThumbnail('https://i.imgur.com/2pszr35.jpg')
			.setAuthor({ name: 'tilnoene', iconURL: 'https://github.com/tilnoene.png', url: 'https://github.com/tilnoene/tle' })
			.setDescription('Bot para programação competitiva')
			.addFields(commands)
			.setTimestamp()
			.setFooter({ text: 'Special thanks to nathaliaop (liaoli)' });

		return interaction.reply({ embeds: [helpMessage] });
	},
};