const fileStatus = require("../../core/fileController");

module.exports = {
  name: "notifications",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "notifications <on|off>",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let worldOption = fileStatus.getInfoFromGuild(message.guild);

    if (args.lenght < 1) {
      return message.channel.send(LANGUAGE.VALUE_INCORRECT);
    }

    if (!(args[0] == "on" || args[0] == "off")) {
      return message.channel.send(LANGUAGE.VALUE_INCORRECT);
    }

    if (worldOption.words == "true" && args[0] == "on") {
      return message.channel.send(LANGUAGE.BANNED_WORD_ALREADY_ACTIVATED);
    }

    if (worldOption.words == "false" && args[0] == "off") {
      return message.channel.send(LANGUAGE.BANNED_WORD_ALREADY_DISABLE);
    }

    let isEnable;

    if (args[0] == "on") {
      isEnable = true;
      message.channel.send(LANGUAGE.ENABLE_LABEL);
    } else if (args[0] == "off") {
      isEnable = false;
      message.channel.send(LANGUAGE.DISABLE_LABEL);
    }

    fileStatus.setNotificationIsOn(message.guild, isEnable);
  },
};
