const { SlashCommandBuilder } = require('@discordjs/builders');

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