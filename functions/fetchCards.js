const axios = require('axios');
const scryAPI = 'https://api.scryfall.com/cards/named?fuzzy=';

async function fetchCards(message) {
	const cards = message.content.match(/\[\[((?:[^\]]|\][^\]])+)\]\]/g);
	for (let i = 0; i < cards.length; i++) {
		let cardName = cards[i].slice(2, -2);
		cardName = cardName.trim();
		cardName = cardName.replace(/ /g, '+');
		requestCard(cardName)
			.then(cardData => {
				// const embed = buildEmbed(cardData);
				const embedFunction = require(`./layouts/${cardData.layout}`);
				const embed = embedFunction.buildEmbed(cardData);
				message.channel.send({ embeds : [embed] });
			})
			.catch(error => {
				console.log(error);
			});
	}
}

function requestCard(cardName) {
	return new Promise((resolve, reject) => {
		axios.get(scryAPI + cardName)
			.then(reponse => {
				resolve(reponse.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

// function buildEmbed(card) {
// 	const embed = new MessageEmbed()
// 		.setTitle(card.name)
// 		.setURL(card.scryfall_uri)
// 		.setColor(0x00AE86)
// 		.setDescription(card.oracle_text)
// 		.setThumbnail(card.image_uris.normal)
// 		.setFooter({ text : 'Card data provided by Scryfall', iconURL : 'https://img.scryfall.com/scryfall/assets/logo-scryfall-c5d6b8d8.png' });
// 	return embed;
// }

module.exports = {
	fetchCards,
};
