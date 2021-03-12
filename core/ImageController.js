module.exports = class ImageControler {
 static GetUserIcon(author) {
    return `https://cdn.discordapp.com/avatars/${author.user.id}/${author.user.avatar}.png`;
  }
  static GetGuildIcon(guild) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
  }
}