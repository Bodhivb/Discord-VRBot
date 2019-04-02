const config = require('../config.json');
const fs = require('fs');

module.exports.config = {
  name: "reload",
  descriptiion: "Reload the bot"
}

module.exports.run = async (bot, message, args) =>
{
    if (message.author.id !== config.ownerID) return;

    if (!args[0])
    {
      //Reload all commands
      fs.readdir('./commands/', (err, files) =>
      {
        if (err) return message.channel.send("Couldn't reload. Error: " + err);
        const jsfiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsfiles.lengte <= 0) return message.channel.send("There are no command defined in the commands folder" + err);

        jsfiles.forEach((f, i) =>
        {
          delete require.cache[require.resolve(`./${f}`)];
          var cmds = require(`./${f}`);
          bot.commands.delete(cmds.config.name);
          bot.commands.set(cmds.config.name, cmds);
        });
        console.log("All of the commands have been reloaded");
        message.channel.send("All of the commands have been reloaded");
      });

    } else {
      //This command require one command line argument, to reload selected command
      let commandName = args[0].toLowerCase();

      try
      {
          delete require.cache[require.resolve(`./${commandName}.js`)];
          const cmd = require(`./${commandName}.js`);
          bot.commands.delete(cmd.config.name);
          bot.commands.set(cmd.config.name, cmd);
      }
      catch(e)
      {
        return message.channel.send("Couldn't reload " + commandName);
      }

      console.log("The command " + commandName + " has been reloaded");
      message.channel.send("The command " + commandName + " has been reloaded");
    }
}
