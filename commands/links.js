const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('links')
		.setDescription('Links de acesso rápido.'),
	async execute(interaction) {
		const row1 = new MessageActionRow()
			.addComponents(
        new MessageButton()
					.setLabel('UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.TELEGRAM_EMOJI_ID)
          .setURL('https://t.me/unballoon'),
        new MessageButton()
					.setLabel('Anúncios UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.TELEGRAM_EMOJI_ID)
          .setURL('https://t.me/avisosunballoon'),
			);

		const row2 = new MessageActionRow()
			.addComponents(
        new MessageButton()
					.setLabel('Grupo de Estudos')
					.setStyle('LINK')
					// .setEmoji(process.env.BALLOON_WHITE_EMOJI_ID)
          .setURL('https://unb-cic.github.io/Maratona-Extensao/'),
        new MessageButton()
					.setLabel('UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.GITHUB_EMOJI_ID)
          .setURL('https://github.com/UnBalloon'),
			);

		const row3 = new MessageActionRow()
			.addComponents(
        new MessageButton()
					.setLabel('UnBalloon')
					.setStyle('LINK')
					.setEmoji(process.env.CODEFORCES_EMOJI_ID)
          .setURL('https://codeforces.com/group/nituVTsHQX/blog'),
				new MessageButton()
					.setLabel('Maratonas DF')
					.setStyle('LINK')
					.setEmoji(process.env.CODEFORCES_EMOJI_ID)
          .setURL('https://codeforces.com/group/btcK4I5D5f/blog'),
			);

		await interaction.reply({ content: 'Links úteis:', components: [row1, row2, row3] });
	},
};