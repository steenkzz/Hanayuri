const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users..first() || message.guild.members.get(args[0]));
  if(tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find('name', "muted");
  if(!muterole){
//start of create role
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#ff70ff",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermission(muterole,{
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addrole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(mutetime)}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
