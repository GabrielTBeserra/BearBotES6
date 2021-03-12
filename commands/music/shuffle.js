module.exports = {
  name: "shuffle",
  category: "music",
  description: "MUSIC_SHUFFLE_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice) {
      return message.channel.send(LANGUAGE.NOT_CONNECTED_IN_VOICE);
    }

    if (!serverQueue) {
      return message.channel.send(LANGUAGE.MUSIC_QUEUECLEAR_STOP);
    }

    let shiftSong = serverQueue.songs.shift();
    let songs = [shiftSong];

    shuffleQueue(serverQueue.songs);

    serverQueue.songs = songs.concat(serverQueue.songs);

    return message.channel.send(LANGUAGE.MUSIC_SHUFFLE);

    function shuffleQueue(queue) {
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
    }
  }
};
