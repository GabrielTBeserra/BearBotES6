const Discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "utils",
  description: "Return the list of all commands",
  run: async (client, message, args, LANGUAGE) => {
    const infoEmbed = new Discord.MessageEmbed();
    infoEmbed.setColor("RANDOM");
    infoEmbed.setTitle("BearBot");
    infoEmbed.addField(
      "Invite",
      "[Click here](https://discordapp.com/oauth2/authorize?client_id=592885875277299733&permissions=8&scope=bot)",
      false
    );

    message.author.send(infoEmbed);
    message.reply(LANGUAGE.SEND_TO_DM);
  }
};
