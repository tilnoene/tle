const config = require("../config.json");

module.exports = async ( client, msg ) => {
    msg.reply("não está funcionando!");
    /*
    const avisoChannel = await msg.guild.channels.find(channel => channel.id == config.avisosChannelId);
    msg.reply("oi");
    var message = msg.content.split(" ");
    message.splice(0, 1);
    message = message.join(" ");
    await avisoChannel.send(`@everyone ${message}`);
    msg.reply(`Avisado no canal ${avisoChannel}`);*/
}