const Discord = require("discord.js");

module.exports = {
  name: "skip",
  category: "music",
  description: "MUSIC_SKIP_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice)
      return message.channel.send(LANGUAGE.MUSIC_SKIP_CHANNEL);

    if (!serverQueue) return message.channel.send(LANGUAGE.SKIP_ERROR_SKIP);

    message.channel.send(LANGUAGE.MUSIC_SKIP_SKIP);
    await serverQueue.connection.dispatcher.end(LANGUAGE.MUSIC_SKIP_SUCESS);
    return undefined;
  }
};
