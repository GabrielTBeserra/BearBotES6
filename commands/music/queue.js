const Discord = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
  category: "music",
  description: "MUSIC_QUEUE_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(LANGUAGE.MUSIC_NOT_PLAYING);
    }

    let musicInfo = serverQueue.songs[0];

    const queueList = new Discord.MessageEmbed();
    queueList.setColor("RANDOM");
    queueList.setTitle(LANGUAGE.MUSIC_QUEUE);
    queueList.setTimestamp();

    let musicList = "";
    /*
     *serverQueue.songs.map(song => {
     *if (musicList.length < 1800) {
     *  musicList += `${song.title}\n`;
     * }
     *});
     */

    let filtered = serverQueue.songs.filter((elem, index) => {
      return index < 10;
    });

    filtered.map((song, index) => {
      musicList += song.title + "\n";
      if (musicList.length < 1400) {
        //let dur = `${song.duration.getMinutes()}:${song.duration.getSeconds()}`;
        queueList.addField(`${index + 1}`, `**${song.title}**`, false);
      }
    });

    queueList.addField(
      LANGUAGE.MUSIC_QUEUE_REMAINING,
      serverQueue.songs.length,
      false
    );

    queueList.addField(
      LANGUAGE.MUSIC_PLAYING_NOW,
      serverQueue.songs[0].title,
      false
    );

    if (serverQueue && serverQueue.playing) {
      return message.channel.send(queueList);
    }
    return message.channel.send(LANGUAGE.MUSIC_NOT_PLAYING);
  }
};
