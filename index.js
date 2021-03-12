/******************/
/* Todos imports  */
/******************/

const { Client, Collection } = require("discord.js");
const client = new Client({ disableEveryone: true });
const configFile = require("./config/config.json");
const invokeCommand = require("./core/commandCore");
const { readdirSync } = require("fs");
const JoinMemberNotification = require("./core/userJoinNotification");
const Activitys = require("./core/setActivitys");

/**
 * Criacao de collenctions
 */
client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

client.queue = new Map();

/**
 * Adiciona todos comandos que o handler capturar
 */
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
// creates an arraylist containing phrases you want your bot to switch through.

/**
 * Quando o bot estiver ON
 */
client.on("ready", () => {
  console.log(`Bot iniciado com:  ${client.user.tag}`);
  console.log(`Bot em: ${client.guilds.cache.size} guilds`);
  console.log(`Bot servindo: ${client.users.cache.size} usuarios`);
  Activitys(client);
});

/**
 * Quando alguem entra no servidor
 */

client.on("guildMemberAdd", async (member) => {
  await JoinMemberNotification.generate(member);
});

/**
 * Quando se recebe uma mensagem
 */

client.on("message", async (message) => {
  invokeCommand(message, client);
});

client.on("shardError", (error) => {
  console.error("A websocket connection encountered an error:", error);
});

client
  .login(configFile.token)
  .then()
  .catch((reason) => {
    console.log("Login failed: " + reason);
  });
