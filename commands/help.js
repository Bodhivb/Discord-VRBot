const fs = require('fs');

module.exports.config = {
    name: "help"
}

module.exports.run = async (bot, message, args) =>
{
    var commandsList = fs.readFileSync('commands.txt', 'utf8');

    message.author.send(commandsList);
    message.channel.send('Help pages has been sent to you')
}
