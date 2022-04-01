module.exports = {
    name: 'message',
    execute(message) {
        message.reply('Hello World!')
        .then(() => console.log('Sent message'))
        .catch(console.error);
    },
};