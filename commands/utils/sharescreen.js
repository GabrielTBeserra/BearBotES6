const Discord = require("discord.js");

module.exports = {
  name: "sharescreen",
  aliases: ["live", "golive", "ssc"],
  category: "utils",
  usage: "sharescreen",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    let isConnected = message.member.voice.channelID == undefined;

    if (!isConnected) {
      let channelID = message.member.voice.channelID;
      let guildID = message.guild.id;
      let guild = message.guild;
      let link = `http://discordapp.com/channels/${guildID}/${channelID}`;

      let guildImage = `https://cdn.discordapp.com/icons/${guildID}/${guild.icon}`;

      // console.log(guild.systemChannelID);

      const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Clique para assitir a live")
        .setAuthor("Some name", guildImage, guildImage)
        .setDescription(`[CLIQUE AQUI](${link})`)
        .setThumbnail(guildImage)
        .setTimestamp()
        .setFooter(guild.name, guildImage);

      message.channel.send(exampleEmbed);
    } else {
      message.channel.send(
        `❌ Voce precisa estar conectado a algum canal de voz!`
      );
    }
  }
};
