module.exports = {
  name: "resume",
  category: "music",
  description: "MUSIC_RESUME_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send(LANGUAGE.MUSIC_RESUME_RESUME);
    }
    return message.channel.send(LANGUAGE.MUSIC_RESUME_PLAYING);
  }
};
