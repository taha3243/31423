const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (
    !["792502247639482408", "792502249405546516", "792502249405546516"].some(
      role => message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`);

  let tag = "卂";
  const kayıtlı = message.guild.roles.cache.find(
    r => r.id === "792502252786810901"
  );
  const kayıtsız = message.guild.roles.cache.find(
    r => r.id === "793225564756115497"
  );

  if (!kayıtlı) return message.reply("Kayıtlı Rolü Ayarlanmamış.");
  if (!kayıtsız) return message.reply("Kayıtsız Rolü Ayarlanmamış.");

  let member =
    message.mentions.users.first() || client.users.cache.get(args.join(" "));
  if (!member) return message.channel.send("Kimi Kayıt Etmem Gerekiyor ?");
  let stg = message.guild.member(member);
  let isim = args[1];
  let yas = args[2];
  if (!isim) return message.reply("İsim Belirt.");
  if (!yas) return message.reply("Yaş Belirt.");

  stg.setNickname(`${tag} ${isim} | ${yas}`);
  stg.roles.add(kayıtlı);
  stg.roles.remove(kayıtsız);

  db.add(`kayıtSayi.${message.author.id}`, 1);
  db.add(`kadinUye.${message.author.id}`, 1);
  let kadın = db.get(`kadinUye.${message.author.id}`);
  let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`);

  const embed = new Discord.MessageEmbed()
    .setTitle(`<a:fors16:785780355264675850> Kayıt İşlemi Tamamlandı`)
    .addField(
      `<a:fors34:785780354535129098> Kayıt Eden:`,
      `<@${message.author.id}> Tarafından Kayıt Edildi`
    )
    .addField(
      `<a:fors34:785780354535129098> Kayıt Edilen:`,
      `<@${stg.user.id}> Kayıt Oldu`
    )
    .addField(
      `<a:fors35:785780357034803212> Verilen Rol:`,
      `<@&${kayıtlı.id}> Rolleri Verildi`
    )
    .addField(
      `<a:fors37:785780355893428245> Alınan Rol:`,
      `<@&${kayıtsız.id}> Rolleri Alındı`
    )
    .addField(
      `<a:fors33:785780356010999868> Yeni İsmin:`,
      `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`
    )
    .addField(
      `<a:fors33:785780356010999868> Yetkili Toplam:`,
      `\`${kayıtlar}\` Kayıtlara Sahip.`
    )
    .setFooter(``)
    .setColor("GREEN");
  client.channels.cache.get("792502254359805952").send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kadın", "k", "woman", "girl", "kız"],
  permLevel: 0
};

exports.help = {
  name: "kadın"
};
