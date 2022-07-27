const { MessageEmbed } = require('discord.js');

function buildEmbed(card) {
	const embed = new MessageEmbed()
		.setTitle(`${card.card_faces[0].name} ${card.card_faces[0].mana_cost}`)
		.setURL(card.scryfall_uri)
		.setColor(0x00AE86)
		.setDescription(getDescription(card))
		.setThumbnail(card.image_uris.normal)
		.setFooter({ text : 'Card data provided by Scryfall', iconURL : 'https://img.scryfall.com/scryfall/assets/logo-scryfall-c5d6b8d8.png' });
	return embed;
}

function getDescription(card) {
	let oracle_text = '';
	oracle_text += `${card.card_faces[0].type_line}\n`;
	oracle_text += `${card.card_faces[0].oracle_text.replace(/\(([^)]+)\)/g, '*($1)*')}\n`;
	oracle_text += `*${card.card_faces[0].flavor_text}*`;
	if (card.card_faces[0].type_line.includes('Creature')) {
		oracle_text += `\n**${card.card_faces[0].power}/${card.card_faces[0].toughness}**`;
	}
	oracle_text += '---------\n';
	oracle_text += `${card.card_faces[1].name} ${card.card_faces[1].mana_cost}\n`;
	oracle_text += `${card.card_faces[1].type_line}\n`;
	oracle_text += `${card.card_faces[1].oracle_text.replace(/\(([^)]+)\)/g, '*($1)*')}\n`;
	oracle_text += `*${card.card_faces[1].flavor_text}*`;
	if (card.card_faces[1].type_line.includes('Creature')) {
		oracle_text += `\n**${card.card_faces[1].power}/${card.card_faces[1].toughness}**`;
	}

	return oracle_text;
}

module.exports = {
	buildEmbed,
};