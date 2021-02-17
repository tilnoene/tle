require('dotenv').config();

module.exports = ( client, msg ) => {
    msg.reply(`esse comando não existe!\n\nDigite ${process.env.PREFIX}help para obter a lista de comandos.`);
}