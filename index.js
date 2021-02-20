const Discord = require("discord.js");
const client = new Discord.Client();

require('dotenv').config();
const webhookListener = require('./scripts/webhook_listener.js');

const commands = require("./scripts/commandsReader")(process.env.PREFIX);
const cron = require('cron');

const unknowCommand = require("./scripts/unknowCommand");
const updateRank = require("./scripts/updateRank");
const dailyReset = require("./scripts/dailyReset");

// reset handle of all users everyday at 00:00 
let timeDailyReset = new cron.CronJob('00 00 00 * * *', () => {
    //console.log(client);
});

timeDailyReset.start();

client.on("ready", () => {
    console.log(`O BOT está online!`);

    const guild = client.guilds.cache.get(process.env.SERVER_ID);
    dailyReset(guild);
});

client.on("message", msg => {

    if (!msg.author.bot && msg.guild) {
        const args = msg.content.split(" ");
        
        if (commands[args[0]]) commands[args[0]](client, msg);
        else if(args[0].split("")[0] == process.env.PREFIX) unknowCommand(client, msg);
    }

})

client.on("guildMemberUpdate", (oldMember, newMember) => {
    updateRank(newMember.guild, newMember);
});

client.login(process.env.DISCORD_TOKEN);