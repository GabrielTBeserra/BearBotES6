const { Util } = require("discord.js");
const ytdl = require("ytdl-core");
const configFile = require("../../config/config.json");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(configFile.GOOGLE_API_KEY);
const Discord = require("discord.js");

module.exports = {
  name: "play",
  category: "music",
  description: "MUSIC_PLAY_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    const { channel } = message.member.voice;

    // Verifica se o usuario esta conectado em algum canal
    if (!channel) {
      return message.channel.send(LANGUAGE.NOT_CONNECTED_IN_VOICE);
    }

    // Verifica as permissoes do bot
    const permissions = channel.permissionsFor(message.client.user);

    // Verifica se o bot pode se conectar ao canal solicitado
    if (!permissions.has("CONNECT")) {
      return message.channel.send(LANGUAGE.PERMISSION_ERROR_CONNECT);
    }

    // Verifica se o bot pode tocar no canal solicitado
    if (!permissions.has("SPEAK")) {
      return message.channel.send(LANGUAGE.PERMISSION_ERROR_SPEAK);
    }

    // const serverQueue = message.client.queue.get(message.guild.id);

    var url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    const searchString = args.slice(0).join(" ");

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        if(video){
          await handlerMusic(video, message, true);
        }
      }

      return message.channel.send(
        `✅ Playlist: **${playlist.title}** foi adicionado a fila!`
      );
    } else {
      try {
        const songS = await ytdl.getInfo(url);
        await handlerMusic(songS, message);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 4);
          const musicEmbed = new Discord.MessageEmbed();
          musicEmbed.setColor("RANDOM");
          musicEmbed.setTitle("Selecione a sua musica");

          let v1 = `1️⃣ >> \`${videos[0].title}\``;
          let v2 = `\n2️⃣ >> \`${videos[1].title}\``;
          let v3 = `\n3️⃣ >> \`${videos[2].title}\``;
          let v4 = `\n4️⃣ >> \`${videos[3].title}\``;
          let v5 = `\n\n❌ >> Para cancelar`;

          musicEmbed.setDescription(v1 + v2 + v3 + v4 + v5);

          let emberMessage = await message.channel
            .send(musicEmbed)
            .then(async (emberMessage) => {
              emberMessage.react("1️⃣"),
                await emberMessage.react("2️⃣"),
                await emberMessage.react("3️⃣"),
                await emberMessage.react("4️⃣"),
                await emberMessage.react("4️⃣"),
                await emberMessage.react("❌");

              try {
                const filter = (reaction, user) => {
                  return (
                    ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "❌"].includes(
                      reaction.emoji.name
                    ) && user.id === message.author.id
                  );
                };

                var option;

                await emberMessage
                  .awaitReactions(filter, {
                    max: 1,
                    time: 10000,
                    errors: ["time"],
                  })
                  .then((collected) => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "1️⃣") {
                      emberMessage.delete();
                      option = 0;
                    } else if (reaction.emoji.name === "2️⃣") {
                      emberMessage.delete();
                      option = 1;
                    } else if (reaction.emoji.name === "3️⃣") {
                      emberMessage.delete();
                      option = 2;
                    } else if (reaction.emoji.name === "4️⃣") {
                      emberMessage.delete();
                      option = 3;
                    } else if (reaction.emoji.name === "❌") {
                      emberMessage.delete();
                      return message.channel.send("Cancelando a musica!");
                    }
                  })
                  .catch((collected) => {
                    emberMessage.delete();
                    option = 0;
                    message.reply("Valor nao inserido, cancelando");
                  });
              } catch (err) {
                console.log(err);
                emberMessage.delete();
                return message.channel.send(
                  "Valor inserido não valido, cancelando musica."
                );
              }

              try {
                if (!videos[option].id) {
                  return;
                }

                var video = await youtube.getVideoByID(videos[option].id);
                url = `https://www.youtube.com/watch?v=${video.id}`;
                const songS = await ytdl.getInfo(url);
                await handlerMusic(songS, message);
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (err) {
          console.error(err);
          return message.channel.send(LANGUAGE.MUSIC_NOT_FOUND);
        }
      }
    }

    async function handlerMusic(songInfo, msg, playlist = false) {
      const serverQueue = msg.client.queue.get(msg.guild.id);

      let song;

      if (playlist) {
        song = {
          id: songInfo.id,
          title: Util.escapeMarkdown(songInfo.title),
          url: songInfo.url,
          user: msg.member,
        };
      } else {
        song = {
          id: songInfo.video_id,
          title: Util.escapeMarkdown(songInfo.title),
          url: songInfo.video_url,
          user: msg.member,
        };
      }

      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: channel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
          const connection = await channel.join();
          queueConstruct.connection = connection;
          play(queueConstruct.songs[0]);
        } catch (error) {
          console.error(`I could not join the voice channel: ${error}`);
          message.client.queue.delete(message.guild.id);
          await channel.leave();
          return message.channel.send(
            `I could not join the voice channel: ${error}`
          );
        }
      } else {
        serverQueue.songs.push(song);
        if (playlist) {
          return undefined;
        }

        return message.channel.send(
          `✅ **${song.title}** ${LANGUAGE.MUSIC_ADD_IN_QUEUE}`
        );
      }
    }

    async function play(song) {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(
          ytdl(song.url, {
            quality: "highestaudio",
            highWaterMark: 1 << 25,
          })
        )
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => {
          if (queue.songs[0]) {
            queue.songs.shift();
            play(queue.songs[0]);
          }
          serverQueue.connection.dispatcher.end("");
          console.error(error);
        });
      dispatcher.setVolumeLogarithmic(queue.volume / 5);

      let guildImage = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}`;
      let userId = `https://cdn.discordapp.com/avatars/${message.member.id}/${message.member.user.avatar}.png`;

      let videoInfo;
      try {
        videoInfo = await ytdl.getInfo(song.url);
      } catch (error) {
        if (queue.songs[0]) {
          queue.songs.shift();
          play(queue.songs[0]);
        } else {
          queue.voiceChannel.leave();
        }
      }

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
        userIcon: userId,
        user: message.member,
      };

      const playingEmbed = new Discord.MessageEmbed();
      playingEmbed.setColor("#00ff04");
      playingEmbed.setTitle(`🎶 **${videoObj.title}**`);
      playingEmbed.setThumbnail(videoObj.thumbnail);
      playingEmbed.setDescription(videoObj.shortDesc);
      playingEmbed.addField("👍", videoObj.likes, true);
      playingEmbed.addField("👎", videoObj.dislikes, true);
      playingEmbed.addField("🎞", videoObj.views, true);
      playingEmbed.addField(
        "Duration",
        `${videoObj.duration.getMinutes()}:${videoObj.duration.getSeconds()}`,
        false
      );
      playingEmbed.setTimestamp();
      playingEmbed.setFooter(
        `Solicitado por: ${videoObj.user.displayName}`,
        videoObj.userIcon
      );

      if (message.client.guildClient.music_notification) {
        message.client.channels
          .fetch(message.client.guildClient.music_notification)
          .then((channel) => channel.send(playingEmbed))
          .catch(console.error);
      } else {
        queue.textChannel.send(playingEmbed);
      }
    }
  },
};
