const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aprendeacodar')
		.setDescription('Você precisa aprender a codar imediatamente.'),
	async execute(interaction) {
		await interaction.reply({ files: [new MessageAttachment('assets/aprende_a_codar.png')] });
	},
};
