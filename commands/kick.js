const Discord = require("discord.js");

module.exports.config = {
    name: "kick"
}

module.exports.run = async (bot, message, args) =>
{
    if (!args[0]) return message.channel.send("This command require one command line argument");

    let targetUser = message.guild.member(message.guild.members.get(args[0]) || message.mentions.users.first());
    if (!targetUser) return message.channel.send("Can't find user");

    //Check if not admin role
    if (targetUser.roles.find(r => r.name === "Team")) return message.channel.send(targetUser + " can't be kicked!");

    let reason = args.join(" ").slice(args[0].length);

    let logChannel = message.guild.channels.find(x => x.name === "logs");
    if (logChannel)
    {
      let msg = new Discord.RichEmbed()
      .setTitle("User kicked")
      .setColor(3447003)
      .addField("Kicked User ", targetUser + ", with the ID of " + targetUser.id)
      .addField("Kicked By ", message.author.username + ", with the ID of " + message.author.id + "")
      .addField("Kicked In ",message.channel.name + " at " + message.createdAt)
      .addField("Reason: ", reason ? reason : "none");

      logChannel.send(msg);
    }

    await targetUser.send("You've been kicked from the VRGame server." + (reason ? " Reason:" + reason + "." : ""));
    message.guild.member(targetUser).kick(reason);
    return message.channel.send("[Server] Kicked player " + targetUser + (reason ? " by reason:" + reason : ""));
}
