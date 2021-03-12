const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const Lang = require("../../core/languageSelector");
const guildOp = require("../../core/fileController");
var LANGUAGE;
var guildInfo;

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "utils",
  description: "Returns all commands, or one specific command info",
  usage: "[command | alias]",
  run: async (client, message, args) => {
    guildInfo = guildOp.getInfoFromGuild(message.guild);
    LANGUAGE = Lang(message.guild);

    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      return getAll(client, message);
    }
  }
};

function getAll(client, message) {
  const embed = new Discord.MessageEmbed().setColor("RANDOM");
  embed.setImage(
    "https://cdn.discordapp.com/attachments/554754159052849154/554757973524742145/Chroma.gif"
  );
  embed.setTitle("All commands for BearBot");
  embed.setAuthor(
    "BearBot",
    "https://cdn.discordapp.com/app-icons/592885875277299733/ee65ba80876139df7dc3ce893b74ae14.png",
    "https://cdn.discordapp.com/app-icons/592885875277299733/ee65ba80876139df7dc3ce893b74ae14.png"
  );
  embed.setTimestamp();

  const commands = category => {
    return client.commands
      .filter(cmd => cmd.category === category)
      .map(cmd => `\`${guildInfo.prefix + cmd.name}\``)
      .join("\n");
  };

  const info = client.categories
    .map(
      cat =>
        stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(
          cat
        )}`
    )
    .reduce((string, category) => string + "\n" + category);

  return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
  const embed = new Discord.MessageEmbed();
  embed.setTimestamp();

  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No information found for command **${input.toLowerCase()}**`;

  // Retorna erro caso nao existe o comando para detalhar
  if (!cmd) {
    return message.channel.send(embed.setColor("RED").setDescription(info));
  }

  // Se possuir nome adiciona o campo
  if (cmd.name) {
    info = `**${LANGUAGE.COMMAND_LABEL}**: ${cmd.name}`;
  }

  // Se possuir ALIASES lista todos
  if (cmd.aliases) {
    info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
  }

  // se possuir descricao
  if (cmd.description) {
    info += `\n**${LANGUAGE.DESCRIPTION_LABEL}**: ${LANGUAGE[cmd.description]}`;
  }

  if (cmd.exemple) {
    info += `\n**${LANGUAGE.EXAMPLE_LABEL}**: ${LANGUAGE[cmd.description]}`;
  }

  // Se possuir forma de usar
  if (cmd.usage) {
    info += `\n**Usage**: ${cmd.usage}`;
    embed.setFooter(`Syntax: <> = required, [] = optional`);
  }

  return message.channel.send(embed.setColor("RANDOM").setDescription(info));
}
