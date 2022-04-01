const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// client.functions = new Collection();
// const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

// for (const file of functionFiles) {
//     const functions = require(`./functions/${file}`);
//     client.functions.set(functions.id, functions.exports);
// }

client.login(process.env.TOKEN);