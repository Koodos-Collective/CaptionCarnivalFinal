const Discord = require("discord.js");

module.exports = {
    name: "about",
    description: "Learn about Cpt. Shon!",
    guildOnly: false,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let aboutEmbed = new Discord.MessageEmbed()
            .setColor("#47EED2")
            .setAuthor(
                "✨ An open source project from the koodos collective ✨",
                "https://koodos.com/koodos_logo.png",
                "https://koodos.com/",
            )
            .setDescription(
                "You can add this bot on other servers using this [link](https://discord.com/oauth2/authorize?client_id=805755365258035252&scope=bot&permissions=8)!",
            );

        message.channel.send({
            embed: aboutEmbed,
        });
    },
};
