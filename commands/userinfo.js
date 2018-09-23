const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let userembed = new Discord.RichEmbed()
  .setDescription("User Information")
  .setColor("#ff70ff")
  .addField("Full Username", `${message.author.tag}`)
  .addField("Nickname", message.member.displayName)
  .addField("User ID", message.author.id)
  .addField("Created At", message.author.createdAt);

  message.channel.send(userembed);

}

module.exports.help = {
  name: "userinfo"
}
