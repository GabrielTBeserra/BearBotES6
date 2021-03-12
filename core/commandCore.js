const configFile = require("../config/config.json");
const Lang = require("../core/languageSelector");
const guildOp = require("../core/fileController");
const analizeMessageContent = require("../core/messageAnalise");

const invoke = async function(message, client) {
  if (message.channel.type === "dm") {
    return;
  }

  let guildInfo = guildOp.getInfoFromGuild(message.guild);

  let messageAnalized = await analizeMessageContent(message);

  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith(guildInfo.prefix)) {
    if (messageAnalized) {
      message.delete();
    }
    return;
  }

  /**
   * Verifica se o canal que esta recebendo a mensagem, e o mesmo que o configurado para aquela guild
   * Caso null pode ser em qualquer canal
   */
  if (
    message.channel.id != guildInfo.commandCnl &&
    guildInfo.commandCnl != null
  ) {
    return;
  }

  if (!message.guild) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(guildInfo.prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  message.client.guildClient = guildInfo;

  let LANGUAGE = Lang(message);

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    if (command.permissions) {
      if (!message.member.hasPermission(command.permissions)) {
        return message.channel.send(LANGUAGE.ERRO_PERMISSION_EXEC_COMMAND);
      }
    }
    try {
      return command.run(client, message, args, LANGUAGE);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = invoke;
