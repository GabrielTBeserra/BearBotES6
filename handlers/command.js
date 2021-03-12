const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Cria uma tabela para listar todos comandos carregados
let table = new ascii("Comandos");
table.setHeading("CommandFile", "Command Status");

module.exports = client => {
  // Le todos o diretorios da pasta commands
  readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );

    // Carrega um por um de cada um dos arquivos das pastas
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);

      // Caso possua um atributo NOME , e adicionado na lista
      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, "✅");
      } else {
        // Caso contrario ele informa o erro
        table.addRow(
          file,
          `❌  -> Verifique o arquivo se esta seguindo o padrao corretamente.`
        );
        continue;
      }

      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });

  console.log(table.toString());
};
