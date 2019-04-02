const config = require('./config.json');
const Discord = require ('discord.js');
const fs = require('fs');
const path = require('path');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.channels = new Discord.Collection();

//Loading commands
fs.readdir('./commands/', (err, files) =>
{
    if (err) return console.log(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) { return console.log("Couldn't find commands");}
    console.log("===| " + jsfiles.length + " Commands found |===");
    jsfiles.forEach((f, i) =>
    {
      let cmds = require(`./commands/${f}`);
      bot.commands.set(cmds.config.name, cmds);
      console.log(`${f} loaded`);
    });
    console.log("");
});

//Loading guilds config
fs.readdir('./storage/guild/', (err, files) => {
  if (err) return console.log(err);
    var directory = files.filter(f => fs.statSync(path.join('./storage/guild/', f)).isDirectory());
    if (directory.length <= 0) { return console.log("Couldn't find guild");}

    console.log("===| " + directory.length + " Guilds found |===");
    directory.forEach((dir, i) => {
        var channelConfig = path.join('./storage/guild/', dir, '/config.json');
        if (fs.existsSync(channelConfig))
        {
            bot.channels.set(dir, channelConfig);
        }
    });
    console.log(bot.channels.size + " Guilds loaded");
    console.log("");
});


bot.on('message', async message =>
{
    let sender = message.author;
    let prefix = config.prefix;

    if (!message.content.startsWith(prefix) || sender.id !== config.ownerID) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let cmdFile = bot.commands.get(cmd.slice(prefix.length));
    if (cmdFile) cmdFile.run(bot, message, args);
});


bot.on('ready', () =>
{
    console.log(`${bot.user.username} is now online`);
    bot.user.setActivity("SteamVR");
});


bot.login(config.token);
