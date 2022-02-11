const { SlashCommandBuilder } = require('@discordjs/builders');
const updateRank = require('../utils/updateRank');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Atualiza seu cargo de acordo com o ranking.'),
	async execute(interaction) {
		await interaction.deferReply();
    await updateRank(interaction.guild, interaction.member);
		await interaction.editReply('Seu ranking foi atualizado com sucesso!');
	},
};