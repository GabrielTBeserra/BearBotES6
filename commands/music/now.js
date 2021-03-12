const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { Util } = require("discord.js");

module.exports = {
  name: "now",
  category: "music",
  aliases: ["np"],
  description: "MUSIC_NOW_DESCRIPTION",
  usage: ".now",
  run: async (client, message, args, LANGUAGE) => {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(LANGUAGE.MUSIC_NOT_PLAYING);

    let guildID = message.guild.id;
    let guild = message.guild;

    let guildImage = `https://cdn.discordapp.com/icons/${guildID}/${guild.icon}`;

    let musicInfo = serverQueue.songs[0];

    let videoInfo = await ytdl.getInfo(musicInfo.url);

    let time = new Date(null);
    time.setSeconds(videoInfo.length_seconds);

    const videoObj = {
      id: videoInfo.video_id,
      title: Util.escapeMarkdown(videoInfo.title),
      url: videoInfo.video_url,
      duration: time,
      likes: videoInfo.likes,
      dislikes: videoInfo.dislikes,
      shortDesc: videoInfo.player_response.videoDetails.shortDescription,
      thumbnail:
        videoInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      views: videoInfo.player_response.videoDetails.viewCount,
      author: videoInfo.player_response.author,
      user: message.member,
    };

    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(LANGUAGE.MUSIC_PLAYING_NOW + videoObj.title)
      .addField(
        "Duration",
        `${videoObj.duration.getMinutes()}:${videoObj.duration.getSeconds()}`,
        false
      )

      .setThumbnail(videoObj.thumbnail)
      .setTimestamp()
      .setFooter(guild.name, guildImage);

    return message.channel.send(exampleEmbed);
  },
};
