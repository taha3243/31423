const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr");
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------KOMUTLAR-------------------------------\\
//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add("793225564756115497"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
  member.setNickname(`卂 İsim | Yaş`);
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "792502254359805952"
  );
  const register = "<@&792502249405546516>";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();

  var kontrol;
  if (kurulus < 1296000000)
    kontrol =
      " <a:hayr:785888880251371521> Hesap Durumu: Güvenilir Değil <a:hayr:785888880251371521> ";
  if (kurulus > 1296000000)
    kontrol =
      " <a:fors16:785780355264675850> Hesap Durumu: Güvenilir Gözüküyor <a:fors16:785780355264675850> ";
  moment.locale("tr");
  const strigalog = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
    .setDescription(
      "**<a:fors34:785780354535129098> Hoşgeldin! <@" +
        member +
        "> Seninle `" +
        member.guild.memberCount +
        "` Kişiyiz. <a:fors34:785780354535129098> \n\n<a:fors35:785780357034803212> Müsait olduğunda Ses Odalarından Birine Geçip Kaydını Yaptırabilirsin. <a:fors35:785780357034803212> \n\n<a:fors8:785780351653118013> <@&792502249405546516> seninle ilgilenicektir. <a:fors8:785780351653118013> \n\n <a:kanltik:785778671012544523> Hesabın Oluşturulma Tarihi:" +
        moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +
        " <a:kanltik:785778671012544523> \n\n" +
        kontrol +
        "\n\n <a:fors37:785780355893428245> Tagımızı alarak ` 卂 ` bize destek olabilirsin.** <a:fors37:785780355893428245> \n"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/792502254359805952/793184480239681566/giphy.gif"
    );
  kanal.send(strigalog);
  kanal.send(register);
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG
