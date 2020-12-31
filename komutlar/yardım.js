const Discord = require("discord.js");

exports.run = async (client, message) => {
  const y = new Discord.MessageEmbed()
    .setColor("RED")
    .addField(
      "**Erkek**",
      "`!erkek {İsim Yaş} : Bir Kişiyi Erkek Olarak Kayıt Edersin`"
    )
    .addField(
      "**Kadın**",
      "`!kız {İsim Yaş} : Bir Kişiyi Kız Olarak Kayıt Edersin`"
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL);
  return message.channel.send(y);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt-yardım"],
  permLevel: 0
};

exports.help = {
  name: "yardım"
};
