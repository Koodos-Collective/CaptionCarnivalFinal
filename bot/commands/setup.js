const Discord = require("discord.js");

module.exports = {
    name: 'setup',
    description: 'Sets up the roles for the Caption Carnival.',
    guildOnly: true,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let currentGuild = message.guild;
        let serverID = message.guild.id;
        let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);

        currentGuild.roles.create({
            data: {
                name: '🤡',
                color: '#47EED2',
                permissions: ['ADD_REACTIONS', 'SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL']
            }
        }).then((role) => {
            message.channel.send(`${role} has been created!`);

            serverData.update({
                eventParticipantRoleID: role.id,
            });

        });

        currentGuild.roles.create({
            data: {
                name: '🤡 Creator',
                color: "#FF944C",
            }
        }).then((role) => {
            message.channel.send(`${role} has been created!`);

            serverData.update({
                eventMakerRoleID: role.id,
            });
        });
    }
};