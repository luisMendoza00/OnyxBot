const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// client.functions = new Collection();
// const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

// for (const file of functionFiles) {
//     const functions = require(`./functions/${file}`);
//     client.functions.set(functions.id, functions.exports);
// }

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', (message) => {
    console.log(message.content);
});

client.login(process.env.TOKEN);