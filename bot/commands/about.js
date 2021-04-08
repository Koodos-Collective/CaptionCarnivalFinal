const Discord = require("discord.js");

module.exports = {
    name: 'about',
    description: 'Learn about Cpt. Shon!',
    guildOnly: false,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let aboutEmbed = new Discord.MessageEmbed()
            .setColor("#47EED2")
            .setAuthor(
                "✨ An open source project from the koodos collective ✨",
                "https://koodos.com/koodos_logo.png",
                "https://koodos.com/"
            );

        message.channel.send({
            embed: aboutEmbed
        });
    }
};