const Discord = require("discord.js");
const client = new Discord.Client();

require('dotenv').config();

const config = require("./config.json");
const commands = require("./scripts/commandsReader")(process.env.PREFIX);
const unknowCommand = require("./scripts/unknowCommand");
const cron = require('cron');

// reset handle of all users everyday at 00:00
let dailyReset = new cron.CronJob('00 00 00 * * *', () => {
    console.log(client);
});

dailyReset.start();

client.on("ready", () => {
    console.log(`O BOT está online!`);
    const list = client.guilds.cache.get("790333694216372265");

    console.log(list.members);
    list.members.cache.forEach(member => console.log(member.displayName)); 
});

client.on("message", msg => {

    if (!msg.author.bot && msg.guild) {
        const args = msg.content.split(" ");
        
        if (commands[args[0]]) commands[args[0]](client, msg);
        else if(args[0].split("")[0] == process.env.PREFIX) unknowCommand(client, msg);
    }

})

client.login(process.env.DISCORD_TOKEN);