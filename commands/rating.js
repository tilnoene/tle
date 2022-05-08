const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');

const getHandles = require('../utils/getHandles');
const getCodeforcesRank = require('../utils/getCodeforcesRank');
const getAtcoderRank = require('../utils/getAtcoderRank');
const generateRCPCToken = require('../utils/generateRCPCToken');

const config = require('../config.json');
const logger = require('../utils/logger');

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
					let profileImageUrl = null;

					await axios.get(`http://${config.api_codeforces}/profile/${handles.codeforces}`, {
						withCredentials: true,
						headers: {
							Cookie: `RCPC=${generateRCPCToken()}`,
						},
					})
						.then(response => cheerio.load(response.data))
						.then($ => {
							profileImageUrl = $('div.title-photo').find('img').attr('src');

							logger.debug(pretty($.html()));
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