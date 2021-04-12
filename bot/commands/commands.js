const Discord = require("discord.js");

// try it out with dynamic pagination
// https://pastebin.com/QGVfutti
module.exports = {
    name: "commands",
    description: "A list of all commands for Caption Carnival-ing",
    guildOnly: false,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let commandsEmbed = new Discord.MessageEmbed()
            .setColor("#47EED2")
            .setTitle("Commands List")
            .setURL("https://link-to.web")
            .addField("\u200b", "**COMMANDS**")
            .addFields(
                {
                    name: "**▶️ `++help`**",
                    value: "Responds with this help menu for all players",
                },
                {
                    name: "**▶️ `++about`**",
                    value: "Lets you learn about Capt. Shon and the people behind this game.",
                },
                {
                    name: "**▶️ `++caption <caption>`**",
                    value: "Creates a new image for an ongoing Caption Circus",
                },
            )
            .addField("\u200b", "**ADMIN COMMANDS**")
            .addFields(
                {
                    name: "**▶️ `++create <channel_name> <image_url>`**",
                    value:
                        "Creates a new Caption Circus with the given Image URL, and creates a separate channel with the given name to hold the carnival.",
                },
                {
                    name: "**▶️ `++setup`**",
                    value: "Allows you to setup roles before the Caption Circus starts.",
                },
                {
                    name: "**▶️ `++cancel`**",
                    value: "Cancels the current Caption Circus. It's gone!",
                },
            );
        message.channel.send({
            embed: commandsEmbed,
        });
    },
};
