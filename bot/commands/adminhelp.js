const Discord = require("discord.js");

module.exports = {
    name: 'adminhelp',
    description: 'Commands List for Admin\'s of Cpt. Shon!',
    guildOnly: false,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let helpEmbed = new Discord.MessageEmbed()
            .setColor("#47EED2")
            .setAuthor("Admin Commands List", "https://koodos.com/koodos_logo.png", "https://www.google.ca")
            .addFields({
                name: '**▶️ `++new <image_url>`**',
                value: 'Creates a new Caption Circus with the given image URL'
            }, {
                name: '**▶️ `++archive`**',
                value: 'Archives the current channel and returns an new Imgur album with all entries submitted'
            }, {
                name: '**▶️ `++cancel`**',
                value: 'Cancel\'s the current Caption Circus. It\'s gone!'
            })

        message.channel.send({
            embed: helpEmbed
        });
    }
};