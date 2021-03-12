const Discord = require("discord.js");
const fetch = require("cross-fetch");
const axios = require("axios");

module.exports = {
  name: "search",
  category: "fun",
  aliases: ["wiki"],
  description: "FUN_SEARCH_DESCRIPTION",
  run: async (client, message, args, LANGUAGE) => {
    var urlWiki;
    let result;

    let lang = LANGUAGE.LANG == "pt-br" ? "pt" : "en";

    var url = `https://${lang}.wikipedia.org/w/api.php`;

    var params = {
      action: "query",
      list: "search",
      srsearch: args.join(" "),
      format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=" + params[key];
    });

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        let prop = response.query.search[0].title.replace(/ /gm, "_");

        fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${prop}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            const searchEmbed = new Discord.MessageEmbed();
            searchEmbed.setColor("YELLOW");
            searchEmbed.setTitle(response.title);
            searchEmbed.setDescription(response.extract);
            if (response.thumbnail) {
              searchEmbed.setThumbnail(response.thumbnail.source);
            }

            message.channel.send(searchEmbed);
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
