const filePrefix = require("../../core/fileController");

module.exports = {
  name: "setcommand",
  category: "tools",
  permissions: ["ADMINISTRATOR"],
  usage: "setcommand <Channel id || channel mension>",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let newChannel = args[0].replace(/[<#>]/g, "");

    filePrefix.changeCommandChannel(message.guild, newChannel);
    return message.channel.send(LANGUAGE.SET_NEW_COMMAND_CHANNEL + args[0]);
  }
};
