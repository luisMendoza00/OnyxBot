const dotenv = require('dotenv');
dotenv.config();
const { city } = require('../config.json');

// const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const weatherAPI = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${city}`;

function execute(message) {
	axios.get(weatherAPI)
		.then(res => {
			if (!res.data.current.is_day) {
				message.channel.send('No esta soleado');
				return;
			}
			if (res.data.current.condition.text !== 'Sunny' && res.data.current.condition.text !== 'Partly cloudy') {
				message.channel.send('No esta soleado');
				return;
			}
			message.channel.send('Esta soleado');
		})
		.catch(err => {
			console.log(err);
		});
}

module.exports = {
	execute,
};