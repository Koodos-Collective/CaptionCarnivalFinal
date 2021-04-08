const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Commands List for Cpt. Shon!',
    guildOnly: false,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let helpEmbed = new Discord.MessageEmbed()
            .setColor("#47EED2")
            .setAuthor("Commands List", "https://koodos.com/koodos_logo.png", "https://www.google.ca")
            .addFields({
                name: '**▶️ ++help**',
                value: 'Responds with this help menu'
            }, {
                name: '**▶️ ++about**',
                value: 'Learn about Cpt. Shon!'
            }, {
                name: '**▶️ ++caption <caption>**',
                value: 'Creates a new image for the given Caption Circus'
            }, {
                name: '**▶️ ++submit <image_url>**',
                value: 'Submits the image to the current Caption Circus'
            }, )

        message.channel.send({
            embed: helpEmbed
        });
    }
};