const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

const getHandles = require('../utils/getHandles');
const getCodeforcesRank = require('../utils/getCodeforcesRank');
const getAtcoderRank = require('../utils/getAtcoderRank');

const config = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rating')
		.setDescription('Retorna rating do usuário.')
		.addStringOption(handle => handle.setName('handle').setDescription('Handle do usuário')),
        async execute(interaction) {
					await interaction.deferReply();

					const handle = interaction.options.get('handle');
					
					if (handle)
						handles = getHandles(handle.value);
					else
						handles = getHandles(interaction.member.nickname || interaction.member.user.username);
					
					const codeforcesRank = await getCodeforcesRank(handles.codeforces);
					const atcoderRank = await getAtcoderRank(handles.atcoder);

					await axios.get(`http://${config.api_codeforces}/profile/${handles.codeforces}`)
						.then(response => cheerio.load(response.data))
						.then($ => {
							$('div.title-photo > div:first-child > div:first-child > div:first-child > img').each((index, element) => {
								profileImageUrl = $(element).attr('src');
							});
						});
					
					const ratingMessage = new MessageEmbed()
						.setColor(config.colors[codeforcesRank.rank])
						.setTitle(handles.codeforces)
						.setURL(`https://codeforces.com/profile/${handles.codeforces}`)
						.setThumbnail(profileImageUrl)
						.addFields([{ name: 'Codeforces', value: `${codeforcesRank.rating}`, inline: true }])
						.addFields([{ name: 'AtCoder', value: `${atcoderRank.rating}`, inline: true }])

					await interaction.editReply({ embeds: [ratingMessage] });
        },
};