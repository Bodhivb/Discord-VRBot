const config = require('./config.json');
const Discord = require ('discord.js');
const fs = require('fs');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) =>
{
    if (err) console.log(err);

     var jsfiles = files.filter(f => f.split('.').pop() === 'js');
     if (jsfiles.lengte <= 0) { return console.log('Cannot find commands')}

     jsfiles.forEach((f, i) =>
     {
       delete require.cache[require.resolve(`./commands/${f}`)];   //for reload
       let cmds = require(`./commands/${f}`);
       console.log(`${f} loaded`);
       bot.commands.set(cmds.config.command, cmds);
     })

});


bot.on('ready', () =>
{
    console.log(`${bot.user.username} is now online`);
    bot.user.setActivity("SteamVR");
});

bot.on('message', async message =>
{
    let sender = message.author;
    let prefix = config.prefix;

    if (sender.id !== '151423248020537345') return;

    let messageArray = message.content.toUpperCase().split(" ");
    let cmd = messageArray[0];
    let cmdFile = bot.commands.get(cmd.slice(prefix.length));
    let args = messageArray.slice(1);

    //if (!message.content.startsWith(prefix)) return;

    if (cmdFile) cmdFile.run(bot, message, args);
});


bot.login(config.token);
