const Discord = require("discord.js");

module.exports.config = {
    name: "mute"
}

module.exports.run = async (bot, message, args) =>
{
    if (!args[0]) return message.channel.send("This command require one command line argument");

    let targetUser = message.guild.member(message.guild.members.get(args[0]) || message.mentions.users.first());
    if (!targetUser) return message.channel.send("Can't find user");

    let reason = args.join(" ").slice(args[0].length);

    let muterole = message.guild.roles.find(r => r.name === "Muted");
    if (!muterole)
    {
      //Add noob-mute roles
      try {
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#2f3136",
          permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TIS_MESSAGE: false,
            ATTACH_FILES: false,
            SPEAK: false
          });
        });
      } catch (e) { }
    }

    targetUser.addRole(muterole.id).then(() => {
      message.channel.send("Succesfully muted");
    })

    return message.channel.send("[Server] mute player " + targetUser + (reason ? " by reason:" + reason : ""));
}
