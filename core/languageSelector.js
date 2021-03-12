module.exports = function(message) {
  let lang = message.client.guildClient.lang;

  if (lang == "pt-br") {
    return require("../translations/pt-br.json");
  } else if (lang == "en") {
    return require("../translations/en.json");
  }
};
