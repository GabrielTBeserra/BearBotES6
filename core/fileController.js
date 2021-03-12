const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("discDB.json");
const db = low(adapter);

function getDefaultJson(guild) {
  return {
    prefix: ".",
    lang: "en",
    notification: guild.systemChannelID,
    commandCnl: null,
    music_notification: null,
    welcome_message: "DEFAULT_WELCOME_MESSAGE",
    notifications: true,
    words_enable: false,
    banned_words: [],
  };
}

const save = (guild) => {
  db.set(guild.id, getDefaultJson(guild)).write();
};

const getInfoFromGuild = (guild) => {
  if (!db.get(guild.id).value()) {
    save(guild, getDefaultJson(guild));
  }
  return db.get(guild.id).value();
};

const changeGuildPrefix = (guild, prefix) => {
  db.set(`${guild.id}.prefix`, prefix).write();
};

const changeGuildNotification = (guild, idCanal) => {
  db.set(`${guild.id}.notification`, idCanal).write();
};

const changeCommandChannel = (guild, idCanal) => {
  db.set(`${guild.id}.commandCnl`, idCanal).write();
};

const setLang = (guild, lang) => {
  db.set(`${guild.id}.lang`, lang).write();
};

const setBanWorldStatus = (guild, isEnable) => {
  db.set(`${guild.id}.words_enable`, isEnable).write();
};

const setMusicNotification = (guild, channel) => {
  db.set(`${guild.id}.music_notification`, channel).write();
};

const addNewBadWord = (guild, newWord) => {
  db.get(`${guild.id}.banned_words`).push(newWord).write();
};

const setNotificationIsOn = (guild, isOn) => {
  db.set(`${guild.id}.notifications`, isOn).write();
};

const removeABadWord = (guild, word) => {
  let removeWord = db.get(`${guild.id}`).value().banned_words.indexOf(word);

  db.get(`${guild.id}.banned_words`).splice(removeWord).write();
};

module.exports = {
  save,
  changeGuildPrefix,
  getInfoFromGuild,
  changeGuildNotification,
  changeCommandChannel,
  setLang,
  setBanWorldStatus,
  removeABadWord,
  addNewBadWord,
  setMusicNotification,
  setNotificationIsOn,
};
