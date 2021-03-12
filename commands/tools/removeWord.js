const fileStatus = require("../../core/fileController");

module.exports = {
  name: "remword",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "Teste",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    fileStatus.removeABadWord(message.guild, args[0]);
  }
};
