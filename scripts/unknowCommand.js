require('dotenv').config();

module.exports = ( message ) => {
    message.channel.send(`Esse comando não existe!\n\nDigite \`${process.env.PREFIX}help\` para obter a lista de comandos.`);
}