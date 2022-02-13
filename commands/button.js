const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Testa um comando.'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
					.setLabel('Grupo de Estudos')
					.setStyle('LINK')
					.setEmoji(process.env.BALLOON_WHITE_EMOJI_ID)
          .setURL('https://unb-cic.github.io/Maratona-Extensao/'),
        new MessageButton()
					.setLabel('UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.GITHUB_EMOJI_ID)
          .setURL('https://github.com/UnBalloon'),
        new MessageButton()
					.setLabel('UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.TELEGRAM_EMOJI_ID)
          .setURL('https://t.me/joinchat/DRxx10GKFnLMk6mDJjzZsQ'),
        new MessageButton()
					.setLabel('Anúncios UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.TELEGRAM_EMOJI_ID)
          .setURL('https://t.me/avisosunballoon'),
			);

		await interaction.reply({ content: 'Selecione uma universidade:', ephemeral: true, components: [row] });
	},
};