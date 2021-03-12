module.exports = {
  name: "pause",
  category: "music",
  description: "MUSIC_PAUSE_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send(LANGUAGE.MUSIC_PAUSED);
    }
    return message.channel.send(LANGUAGE.MUSIC_NOT_PLAYING);
  }
};
