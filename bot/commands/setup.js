const Discord = require("discord.js");

module.exports = {
    name: "setup",
    description: "Sets up the roles for the Caption Carnival.",
    guildOnly: true,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let currentGuild = message.guild;
        let serverID = message.guild.id;
        let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);

        // roles
        let roleNames = ["🤡", "🤡 creator"];
        let i;

        // to integrate - don't let users use the setup command in a channel after it's been used once
        for (i in roleNames) {
            var role = message.guild.roles.cache.find(x => x.name === roleNames[i]);

            if (typeof role === undefined && roleNames[i] === roleNames[0]) {
                currentGuild.roles
                    .create({
                        data: {
                            name: roleNames[0],
                            color: "#47EED2",
                            permissions: [
                                "ADD_REACTIONS",
                                "SEND_MESSAGES",
                                "EMBED_LINKS",
                                "VIEW_CHANNEL",
                            ],
                        },
                    })
                    .then(role => {
                        message.channel.send(`${role} has been created!`);

                        serverData.update({
                            eventParticipantRoleID: role.id,
                        });
                    });
            }

            if (roleNames[i] === roleNames[1]) {
                currentGuild.roles
                    .create({
                        data: {
                            name: roleNames[1],
                            color: "#FF944C",
                        },
                    })
                    .then(role => {
                        message.channel.send(`${role} has been created!`);

                        serverData.update({
                            eventMakerRoleID: role.id,
                        });
                    });
            } else {
                message.channel.send(
                    `the role @${roleNames[i]} already exist in the server, so i won't be making them again :eyes:`,
                );
            }
        }
    },
};
