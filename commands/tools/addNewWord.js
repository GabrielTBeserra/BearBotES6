const fileStatus = require("../../core/fileController");

module.exports = {
  name: "addword",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "Teste",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let alreadyAdded = fileStatus.getInfoFromGuild(message.guild);

    if (alreadyAdded.banned_words.indexOf(args[0]) != -1) {
      return message.channel.send(LANGUAGE.ADD_NEW_WORD_ALREADY_ADDED);
    }

    fileStatus.addNewBadWord(message.guild, args[0]);

    return message.channel.send(
      `${LANGUAGE.ADD_NEW_WORD_MESSAGE} \`${args[0]}\``
    );
  }
};
