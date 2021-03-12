const fileStatus = require("../../core/fileController");

module.exports = {
  name: "badwords",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "Teste",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let worldOption = fileStatus.getInfoFromGuild(message.guild);

    if (!(args[0] == "enable" || args[0] == "disable")) {
      return message.channel.send(LANGUAGE.VALUE_INCORRECT);
    }

    if (worldOption.words == "true" && args[0] == "enable") {
      return message.channel.send(LANGUAGE.BANNED_WORD_ALREADY_ACTIVATED);
    }

    if (worldOption.words == "false" && args[0] == "disable") {
      return message.channel.send(LANGUAGE.BANNED_WORD_ALREADY_DISABLE);
    }

    let isEnable;

    if (args[0] == "enable") {
      isEnable = true;
      message.channel.send(LANGUAGE.ENABLE_LABEL);
    } else if (args[0] == "disable") {
      isEnable = false;
      message.channel.send(LANGUAGE.DISABLE_LABEL);
    }

    fileStatus.setBanWorldStatus(message.guild, isEnable);
  }
};
