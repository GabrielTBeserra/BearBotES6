const guildOp = require("../core/fileController");

const analizer = async function(message) {
  let isBanned = false;
  let guildInfo = guildOp.getInfoFromGuild(message.guild);
  let content = message.content;

  if (!guildInfo.words_enable) {
    return;
  }

  let bannedWords = guildInfo.banned_words;

  bannedWords.map(value => {
    let exp = new RegExp(value, "gm");
    if (content.match(exp) != null) {
      isBanned = true;
    }
  });

  return isBanned;
};

module.exports = analizer;
