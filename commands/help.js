require('dotenv').config();

const config = require("../config.json");
const commands = require("../scripts/commandsReader")(process.env.PREFIX);

const descriptions = {
    "-help": "Obter a lista de comandos e informações sobre o bot",
    "-refresh": "Atualiza seu cargo de acordo com seu rank atual do Codeforces",
    "-rating": "Informa o rating e o rank do usuário informado"
};

module.exports = async ( client, msg ) => {
    var texto = "Comandos disponíveis:\n";

    Object.keys(commands).forEach(command => {
        texto += `\n${"`" + command}${command === "-rating" ? " handle`" : "`"}: ${descriptions[command] ? descriptions[command] : "Sem descrição"}`;
    });

    //texto += `\n\nLink do projeto: ${"https://www.google.com.br/"}`;

    msg.channel.send(texto);
};