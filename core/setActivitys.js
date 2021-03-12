const acs = async function(client) {
  let acNum = 0;

  setInterval(() => {
    if (acNum === 0) {
      client.user.setActivity(".help", {
        type: "STREAMING",
        url: "https://www.twitch.tv/1urso"
      });
      acNum = 1;
    } else if (acNum === 1) {
      client.user.setActivity(
        `Estou em ${client.guilds.cache.size} servidores`,
        {
          type: "STREAMING",
          url: "https://www.twitch.tv/1urso"
        }
      );
      acNum = 2;
    } else if (acNum === 2) {
      client.user.setActivity(
        `Estou servindo ${client.users.cache.size} usuarios`,
        {
          type: "STREAMING",
          url: "https://www.twitch.tv/1urso"
        }
      );
      acNum = 0;
    }
  }, 5 * 1000);
};

module.exports = acs;
