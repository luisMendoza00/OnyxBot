const { MessageEmbed } = require('discord.js');

const counters = [
	'Flying',
	'First Strike',
	'Deathtouch',
	'Hexproof',
	'Lifelink',
	'Menace',
	'Reach',
	'Trample',
	'Vigilance',
	'+1/+1',
];

let chosenCounters = [];
let availableCounters = counters;

function execute(message, params) {
	if (params[0] === 'roll') {
		rollCounters(message);
		return;
	}
	if (params[0] === 'reset') {
		resetCounters(message);
		return;
	}
	if (params[0] === 'list') {
		listCounters(message);
		return;
	}
}

function rollCounters(message) {
	if (availableCounters.length === 0) {
		message.channel.send('No hay counters disponibles');
		return;
	}
	const randomCounter = availableCounters[Math.floor(Math.random() * availableCounters.length)];
	chosenCounters.push(randomCounter);
	availableCounters.splice(availableCounters.indexOf(randomCounter), 1);
	const embed = buildEmbed([randomCounter], 'You rolled');
	message.channel.send({ embeds : [embed] });
}

function resetCounters(message) {
	chosenCounters = [];
	availableCounters = counters;
	message.channel.send('Counters reset');
}

function listCounters(message) {
	const embed = buildEmbed(chosenCounters, 'Crystalline Giant has');
	message.channel.send({ embeds : [embed] });
}

function buildEmbed(list, title) {
	const embed = new MessageEmbed()
		.setTitle(title)
		.setDescription(list.join('\n'))
		.setColor(0x00AE86)
		.setThumbnail('https://c1.scryfall.com/file/scryfall-cards/large/front/e/5/e5e0e7fa-d911-449b-8902-921d861f1d13.jpg?1650424325')
		.setFooter({ text : 'Card data provided by Scryfall', iconURL : 'https://img.scryfall.com/scryfall/assets/logo-scryfall-c5d6b8d8.png' });
	return embed;
}


module.exports = {
	execute,
};