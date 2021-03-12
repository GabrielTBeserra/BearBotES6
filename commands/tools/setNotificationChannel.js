const filePrefix = require("../../core/fileController");

module.exports = {
  name: "setnotification",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "Teste",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let newChannel = args[0].replace(/[<#>]/g, "");

    filePrefix.changeGuildNotification(message.guild, newChannel);
    return message.channel.send(LANGUAGE.SET_NOTIFICATION_CHANNEL + args[0]);
  }
};
