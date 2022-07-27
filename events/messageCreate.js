const fetchCards = require('../functions/fetchCards');
const { prefix } = require('../config.json');

module.exports = {
	name : 'messageCreate',
	once : false,
	execute(client, message) {
		if (message.author.bot) return;
		// check if message contains closed square brackets
		if (message.content.match(/\[\[((?:[^\]]|\][^\]])+)\]\]/g)) {
			fetchCards.fetchCards(message);
			return;
		}
		if (!message.content.startsWith(prefix)) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		const params = args;
		try {
			const commandFile = require(`../functions/${command}.js`);
			commandFile.execute(message, params);
		}
		catch (err) {
			return;
		}
	},
};