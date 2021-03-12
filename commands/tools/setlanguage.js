const filePrefix = require("../../core/fileController");

module.exports = {
  name: "setlanguage",
  category: "tools",
  usage: "setlanguage [LANGUAGE]",
  permissions: ["ADMINISTRATOR"],
  aliases: ["setlang"],
  description: "SETLANGUAGE_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    if (args.length == 0) {
      message.channel.send(":flag_br: - pt-br");
      message.channel.send(":flag_um:- en");
      message.channel.send(
        "Para definir o idioma use `.setlanguage <language>`"
      );
      return;
    } else {
      if (!(args[0] == "pt-br" || args[0] == "en")) {
        message.channel.send(LANGUAGE.SETLANGUAGE_LANG_NOT_FOUND);
        return;
      }
    }
    filePrefix.setLang(message.guild, args[0]);
    return message.channel.send(LANGUAGE.LANG_CHANGED);
  }
};
