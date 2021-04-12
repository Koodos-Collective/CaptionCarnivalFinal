const Discord = require("discord.js");

// try it out with dynamic pagination
// https://pastebin.com/QGVfutti
module.exports = {
    name: "help",
    description: "Commands List for Cpt. Shon!",
    guildOnly: false,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let helpEmbed = new Discord.MessageEmbed()
            .setColor("#47EED2")
            .setTitle("Help Menu")
            .setURL("https://🤡.fm")
            .setDescription(
                "Hey there :eyes: Do you want to find out more about this game? Then, you can use the `++commands` command to know more about each command, or the `++about` command to find out more info about the creators of this game.",
            );
        message.channel.send({
            embed: helpEmbed,
        });
    },
};
