module.exports.config = {
    name: "clear"
}

module.exports.run = async (bot, message, args) =>
{
    if (!args[0]) return message.channel.send("This command require one command line argument");

    try
    {
      message.channel.bulkDelete(args[0]).catch(() => message.channel.send("The argument must be a number between 0 and 100"));
    }
    catch (e)
    {
      message.channel.send("The argument must be a number between 0 and 100");
    }
}
