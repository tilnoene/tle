const { SlashCommandBuilder } = require('@discordjs/builders');
const updateRank = require('../utils/updateRank');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		await interaction.deferReply();
    await updateRank(interaction.guild, interaction.member);
		await interaction.editReply('Seu ranking foi atualizado com sucesso!');
	},
};