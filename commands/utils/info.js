const Discord = require("discord.js");

module.exports = {
  name: "info",
  category: "utils",
  aliases: ["i"],
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let guildID = message.guild.id;
    let guild = message.guild;

    let infoFromGuild = client.guildClient;

    let commandChannel =
      infoFromGuild.commandCnl == null
        ? LANGUAGE.COMMAND_CHANNEL_NOT_DEFINED
        : `<#${infoFromGuild.commandCnl}>`;

    let guildImage = `https://cdn.discordapp.com/icons/${guildID}/${guild.icon}`;
    const infoEmbed = new Discord.MessageEmbed();
    infoEmbed.setColor("RANDOM");
    infoEmbed.setTitle(`${message.guild.name} info\`s`);
    infoEmbed.setAuthor(`${message.guild.name}`, guildImage, guildImage);
    infoEmbed.addField("**Prefix**", `\`${infoFromGuild.prefix}\``, false);
    infoEmbed.addField(
      "Notification Channel",
      `<#${infoFromGuild.notification}>`,
      false
    );
    infoEmbed.addField("Command Channel", commandChannel, false);
    infoEmbed.addField("Language", `${infoFromGuild.lang}`, false);
    if (infoFromGuild.banned_words.length > 0) {
      infoEmbed.addField(
        "BannedWords",
        `${infoFromGuild.banned_words.join(" ")}`,
        false
      );
    }
    infoEmbed.setTimestamp();
    infoEmbed.setFooter(guild.name, guildImage);

    message.channel.send(infoEmbed);
  }
};
