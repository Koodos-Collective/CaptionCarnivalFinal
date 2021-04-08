const fs = require("fs");
const Discord = require("discord.js");
const {
    prefix,
    token,
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
} = require("./config");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

///////////////////////////////////////////// FIREBASE STUFF START /////////////////////////////////////////////
const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
});

let database = firebase.firestore();

///////////////////////////////////////////// FIREBASE STUFF END /////////////////////////////////////////////

///////////////////////////////////////////// DISCORD STUFF START /////////////////////////////////////////////
client.login(token);

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs! Try using it in a server.");
    }

    if (command.dmOnly && message.channel.type !== "dm") {
        return message.reply("I can't execute that command outside DMs! Try using it in a DM with me.");
    }

    try {
        command.execute(client, message, message.author, args, database);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }

    if (message.content.includes("++submit") && args.length == 1) {
        message.delete().catch(function (error) {
            console.log("Error deleting message:", error);
        });
    }

    if (message.content.includes("++caption")) {
        message.delete().catch(function (error) {
            console.log("Error deleting message: ", error);
        });
    }
});

client.login(token);

///////////////////////////////////////////// DISCORD STUFF END /////////////////////////////////////////////