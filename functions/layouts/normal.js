const { MessageEmbed } = require('discord.js');

function buildEmbed(card) {
	const embed = new MessageEmbed()
		.setTitle(`${card.name} ${card.mana_cost}`)
		.setURL(card.scryfall_uri)
		.setColor(0x00AE86)
		.setDescription(getDescription(card))
		.setThumbnail(card.image_uris.normal)
		.setFooter({ text : 'Card data provided by Scryfall', iconURL : 'https://img.scryfall.com/scryfall/assets/logo-scryfall-c5d6b8d8.png' });
	return embed;
}

function getDescription(card) {
	let description = '';
	description += `${card.type_line}\n`;
	description += `${card.oracle_text.replace(/\(([^)]+)\)/g, '*($1)*')}\n`;
	description += `*${card.flavor_text}*`;
	if (card.type_line.includes('Creature')) {
		description += `\n**${card.power}/${card.toughness}**`;
	}
	return description;
}

module.exports = {
	buildEmbed,
};