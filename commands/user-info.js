const { SlashCommandBuilder } = require('@discordjs/builders');
const updateRank = require('../utils/updateRank');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		// updateRank(interaction.guild, interaction.member);

		interaction.deferReply();

		interaction.editReply({ content: "replied" });
	},
};