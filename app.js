const config = require('./config.json');
const Discord = require ('discord.js');
const fs = require('fs');

const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () =>
{
    console.log(`${bot.user.username} is now online`);
    bot.user.setGame("SteamVR");
});


bot.login(config.token);
