module.exports = {
  name: "stop",
  category: "music",
  description: "MUSIC_STOP_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice)
      return message.channel.send(LANGUAGE.MUSIC_STOP_CHANNEL);

    if (!serverQueue) return message.channel.send(LANGUAGE.MUSIC_STOP_PLAYING);

    message.channel.send(LANGUAGE.MUSIC_STOP_STOP);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(LANGUAGE.MUSIC_STOP_COMMAND);

    return undefined;
  }
};
