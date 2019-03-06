const config = require('./config.json');
const Discord = require ('discord.js');
const fs = require('fs');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir('./commands/', (err, files) =>
{
    if (err) console.log(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.lengte <= 0) { return console.log("Couldn't find commands");}

    jsfiles.forEach((f, i) =>
    {
      delete require.cache[require.resolve(`./commands/${f}`)];   //for reload
      let cmds = require(`./commands/${f}`);
      bot.commands.set(cmds.config.name, cmds);
      console.log(`${f} loaded`);
    });
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
