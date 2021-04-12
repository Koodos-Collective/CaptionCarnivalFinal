const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token, firebaseConfig } = require("./config");
const express = require("express");
const app = express();

// const console = { log: debug };
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

///////////////////////////////////////////// FIREBASE START /////////////////////////////////////////////
const firebase = require("firebase");
const admin = require("firebase-admin");
require("firebase/firestore");

var serviceAccount = require("./local-circuit-297619-firebase-adminsdk-e7ql4-77f0551aae.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

firebase.initializeApp(firebaseConfig);
let database = firebase.firestore();

///////////////////////////////////////////// FIREBASE END /////////////////////////////////////////////

///////////////////////////////////////////// DISCORD START /////////////////////////////////////////////
client.login(token);

client.once("ready", () => {
    console.log("the caption carnival bot is ready! 🤡 capt. shon is at your service.");
});

client.on("guildCreate", guild => {
    let messageEmbed = new Discord.MessageEmbed()
        .setColor("#47EED2")
        .setTitle("🎡 Caption Carnival 🎪")
        .setThumbnail("https://koodos.com/koodos_logo.png")
        .setDescription(
            "Hey there 👀 I am the great Captain Shon (like Capt. Shon, get it?) and I have graced my presence in your server to host some great **Caption Carnivals**. You can type `++help` to get started right away!",
        )
        .addField(
            "**🎡 Caption Carnival 🎪** is an ✨ *Open Source project* ✨",
            "by [Sirat](https://sirat.xyz) and [Hannah](https://hannahguo.me) from the ***[koodos collective](https://koodos.com)***",
        )
        .addFields(
            { name: "via 🤡.fm!", value: "see [🤡.fm](https://🤡.fm) for more info 🕵️" },
            {
                name: "read about this project",
                value: "on our [substack](https://kcollective.substack.com) 📖",
            },
        );
    guild.systemChannel.send(messageEmbed);
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs! Try using it in a server.");
    }

    if (command.dmOnly && message.channel.type !== "dm") {
        return message.reply(
            "I can't execute that command outside DMs! Try using it in a DM with me.",
        );
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

///////////////////////////////////////////// DISCORD END /////////////////////////////////////////////

// express port
const port = process.env.PORT || 8080;

// displayed on localhost:
app.get("/", (req, res) => {
    res.send(`Caption Carnival lies here.`);
});

app.listen(port, () => {
    console.log(`this discord bot is listening on port http://localhost:${port}`);
});
