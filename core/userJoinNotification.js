const Lang = require("../core/languageSelector");
const guildOp = require("./fileController");
const Discord = require("discord.js");
const ImageControler = require("../core/ImageController");

const generate = async function (info) {
  let guildInfo = guildOp.getInfoFromGuild(info.guild);
  info.client.guildClient = guildInfo;
  let notificationChannel = guildInfo.notification;
  let LANGUAGE = Lang(info);

  if (!guildInfo.notifications) {
    return;
  }
  const welcomeEmbedMessage = new Discord.MessageEmbed().setColor("#fc034e");
  welcomeEmbedMessage.setImage("https://cdn.discordapp.com/attachments/554754159052849154/554757973524742145/Chroma.gif");
  welcomeEmbedMessage.setThumbnail(ImageControler.GetUserIcon(info));
  welcomeEmbedMessage.setTitle(LANGUAGE.WELCOME_TO_SERVER + ` '${info.guild.name}'`);
  welcomeEmbedMessage.setDescription("<@" + info.id + ">");
  welcomeEmbedMessage.addField("Region", info.guild.region.charAt(0).toUpperCase() + info.guild.region.slice(1), true);
  welcomeEmbedMessage.addField("Membros", info.guild.memberCount, true);
  welcomeEmbedMessage.addField("Owner", "<@" + info.guild.ownerID + ">", true);
  welcomeEmbedMessage.setAuthor("BearBot", ImageControler.GetGuildIcon(info.guild), ImageControler.GetGuildIcon(info.guild));
  welcomeEmbedMessage.setTimestamp();
  welcomeEmbedMessage.setFooter(info.guild.name, ImageControler.GetGuildIcon(info.guild));

  info.client.channels
    .fetch(notificationChannel)
    .then((channel) => channel.send(welcomeEmbedMessage))
    .catch(console.error);
};

module.exports = {
  generate,
};
