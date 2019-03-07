const config = require('../config.json');

module.exports.config = {
  name: "shutdown",
  descriptiion: "shuts down the bot"
}

module.exports.run = async (bot, message, args) =>
{
    if (message.author.id !== config.ownerID) return;

    try
    {
      await message.channel.send("Bot is shutting down...");
      process.exit();
    }
    catch (e)
    {
      message.chanel.send("Fail to shut down the bot");
    }
}
