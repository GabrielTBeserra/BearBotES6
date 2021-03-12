module.exports = {
  name: "queueclear",
  category: "music",
  aliases: ["qc"],
  description: "MUSIC_QUEUECLEAR_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voice) {
      return message.channel.send(LANGUAGE.NOT_CONNECTED_IN_VOICE);
    }

    if (!serverQueue) {
      return message.channel.send(LANGUAGE.MUSIC_QUEUECLEAR_STOP);
    }

    let newArray = [];
    newArray.push(serverQueue.songs.shift());
    serverQueue.songs = newArray;

    return message.channel.send(LANGUAGE.MUSIC_QUEUECLEAR_CLEAR);
  }
};
