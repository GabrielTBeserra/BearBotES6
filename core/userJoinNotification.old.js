const jimp = require("jimp");
const guildOp = require("./fileController");

const generate = async function(message) {
  let guildInfo = guildOp.getInfoFromGuild(message.guild);
  let notificationChannel = guildInfo.notification;

  let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
  let mask = await jimp.read("config\\images\\mascara.png");
  let fundo = await jimp.read("config\\images\\fundo.png");

  jimp
    .read(
      `https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png`
    )
    .then(avatar => {
      avatar.resize(130, 130);
      mask.resize(130, 130);
      avatar.mask(mask);

      fundo.print(fonte, 170, 175, message.user.username);
      fundo.composite(avatar, 10, 90).write("config\\images\\bemvindo.png");

      message.client.channels
        .fetch(notificationChannel)
        .then(channel =>
          channel.send(``, { files: ["config\\images\\bemvindo.png"] })
        )
        .catch(console.error);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  generate
};
