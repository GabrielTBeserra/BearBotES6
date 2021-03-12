const filePrefix = require("../../core/fileController");

module.exports = {
  name: "setprefix",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "Teste",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    filePrefix.changeGuildPrefix(message.guild, args[0]);
    return message.channel.send(
      `${LANGUAGE.SET_PREFIX_NOTIFICATION}\`${args[0]}\``
    );
  }
};
