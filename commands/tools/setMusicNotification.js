const filePrefix = require("../../core/fileController");

module.exports = {
  name: "setmusicnotification",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "Teste",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let newChannel = args[0].replace(/[<#>]/g, "");

    filePrefix.setMusicNotification(message.guild, newChannel);
    return message.channel.send(
      LANGUAGE.SET_MUSIC_NOTIFICATION_CHANNEL + args[0]
    );
  }
};
