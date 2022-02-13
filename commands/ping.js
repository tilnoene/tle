const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Testa um comando.'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Selecione uma universidade')
					.addOptions([
						{
							label: 'IFB',
							description: 'Instituto Federal de Brasília',
							value: 'ifb',
						},
						{
							label: `UnB`,
							description: 'Universidade de Brasília',
							value: 'unb',
						},
					]),
			);

		await interaction.reply({ content: 'Selecione uma universidade:', ephemeral: true, components: [row] });
	},
};