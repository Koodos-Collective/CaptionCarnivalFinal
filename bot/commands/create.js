const Discord = require("discord.js");
const firebase = require("firebase");
require("firebase/firestore");

function createChannels(
    message,
    server,
    eventName,
    imageURL,
    channelServerData,
    serverData,
    eventNum,
    database,
    serverID,
) {
    if (eventNum == 1 || channelServerData.eventCategoryID == 0) {
        message.guild.channels
            .create("🤡", {
                type: "category",
            })
            .then(channel => {
                serverData.update({
                    eventCategoryID: channel.id,
                });
            })
            .catch(console.error);
    }

    message.guild.channels
        .create(`🤡-${eventName}`, {
            topic: "Type ++help to learn about this channel",
            reason: "New Caption Circus",
        })
        .then(channel => {
            let introEmbed = new Discord.MessageEmbed()
                .setColor("#47EED2")
                .addFields(
                    {
                        name: `🎪 Welcome one, welcome all to the ${eventName} Caption Circus! 🎪`,
                        value: `It's time to make your own act to entertain the masses!`,
                    },
                    {
                        name:
                            "Message the bot in this channel to add captions to the meme using `++caption <meme_caption>`",
                        value: "Here is the base for your meme. Get making!",
                    },
                )
                .setImage(imageURL);

            channel
                .send({
                    embed: introEmbed,
                })
                .then(msg => msg.pin());

            if (channelServerData != undefined && channelServerData.eventParticipantRoleID != 0) {
                channel.send(
                    `<@&${channelServerData.eventParticipantRoleID}> There's a new Circus in the server!`,
                );
            }

            serverData.update({
                eventChannelID: firebase.firestore.FieldValue.arrayUnion(channel.id),
            });

            database
                .collection(`servers/${serverID}/events`)
                .doc("" + eventNum)
                .update({
                    channelID: channel.id,
                });

            let category = server.channels.cache.find(c => c.name == "🤡" && c.type == "category");
            channel.setParent(category.id);
        })
        .catch(console.error);
}

function addMakerRole(message) {
    let roleMember = message.member.roles.cache.some(role => role.name === "🤡 Creator");
    let role = message.guild.roles.cache.find(r => r.name === "🤡 Creator");
    if (!roleMember && role) {
        message.member.roles.add(role).catch(console.error);
    }
}

module.exports = {
    name: "create",
    description: "Create a channel for the Caption Circus!",
    guildOnly: true,
    dmOnly: false,
    execute(client, message, author, args, database) {
        let server = message.guild;
        let serverID = message.guild.id;
        let serverName = message.guild.name;
        let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);

        if (args.length != 2) {
            message.reply(
                "you need to specify a name and an image for the Caption Circus! Use the following format",
            );
            return message.channel.send(
                "Use the following format: `++new <caption_Circus_name> <base_image_url>`",
            );
        } else if (args[1].match(/^http.*\.(jpeg|jpg|gif|png)$/) == null) {
            return message.channel.send("Invalid image URL! Please try again.");
        }

        let eventName = args[0];
        let imageURL = args[1];

        serverData.get().then(docSnapshot => {
            if (!docSnapshot.exists) {
                database.collection(`servers/${serverID}/events`).doc(`1`).set({
                    channelID: 0,
                    name: eventName,
                    imageURL: imageURL,
                    acceptingSubmissions: true,
                    submissionNum: 0,
                    usersParticipating: [],
                    submissions: [],
                });

                serverData.set({
                    totalNumberOfEvents: 1,
                    totalNumberOfActiveEvents: 1,
                    server: serverName,
                    eventParticipantRoleID: 0,
                    eventMakerRoleID: 0,
                    eventCategoryID: 0,
                    eventChannelNames: [],
                    eventChannelIDs: [],
                });

                createChannels(
                    message,
                    server,
                    eventName,
                    imageURL,
                    docSnapshot.data(),
                    serverData,
                    1,
                    database,
                    serverID,
                );

                addMakerRole(message);

                let createEmbed = new Discord.MessageEmbed()
                    .setColor("#47EED2")
                    .setImage(imageURL)
                    .setAuthor(`🎉 The ${eventName} Circus has been created! `)
                    .addField("Here's the image your server will be using. ", "Have fun!");

                return message.channel.send({
                    embed: createEmbed,
                });
            } else {
                if (docSnapshot.data().eventChannelNames.includes(eventName)) {
                    return message.channel.send(
                        `❌ There is already a Circus with that name for this server! Try a different name.`,
                    );
                } else {
                    if (docSnapshot.data().totalNumberOfActiveEvents != 100) {
                        let currentEventNumber = parseInt(docSnapshot.data().totalNumberOfEvents);
                        database
                            .collection(`servers/${serverID}/events`)
                            .doc(`${currentEventNumber + 1}`)
                            .set({
                                channelID: 0,
                                name: eventName,
                                imageURL: imageURL,
                                submissionNum: 0,
                                usersParticipating: [],
                                submissions: [],
                            });

                        serverData.update({
                            eventChannelNames: firebase.firestore.FieldValue.arrayUnion(eventName),
                            totalNumberOfEvents: firebase.firestore.FieldValue.increment(1),
                        });

                        createChannels(
                            message,
                            server,
                            eventName,
                            imageURL,
                            docSnapshot.data(),
                            serverData,
                            currentEventNumber + 1,
                            database,
                            serverID,
                        );

                        addMakerRole(message);

                        let createEmbed = new Discord.MessageEmbed()
                            .setColor("#47EED2")
                            .setImage(imageURL)
                            .setAuthor(`🎉 The ${eventName} Caption Circus has been created! `)
                            .addField("Here's the image your server will be using. ", "Have fun!");

                        return message.channel.send({
                            embed: createEmbed,
                        });
                    } else {
                        return message.channel.send(
                            `❌ You've reached the limit for active ongoing Caption Circuss!`,
                        );
                    }
                }
            }
        });
    },
};
