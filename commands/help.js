require('dotenv').config();

const commands = require("../scripts/commandsReader")(process.env.PREFIX);

const descriptions = {
    "-help": "Obter a lista de comandos e informações sobre o bot",
    "-refresh": "Atualiza seu cargo de acordo com seu rank atual do Codeforces e do AtCoder",
    "-rating": "Informa o rating e o rank do usuário informado"
};

module.exports = async ( client, msg ) => {
    var texto = "Comandos disponíveis:\n";

    Object.keys(commands).forEach(command => {
        texto += `\n${"`" + command}${command === "-rating" ? " handle`" : "`"}: ${descriptions[command] ? descriptions[command] : "Sem descrição"}`;
    });

    texto += `\n\nLink do projeto: ${"https://github.com/tilnoene/TLE"}`;

    msg.channel.send(texto);
};