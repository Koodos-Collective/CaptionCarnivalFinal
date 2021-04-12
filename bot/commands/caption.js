const Discord = require("discord.js");
const nodeHtmlToImage = require("node-html-to-image");
const btoa = require("btoa");
const firebase = require("firebase");
const request = require("request");
require("firebase/firestore");

function chooseRandomColor() {
    let colors, random, color;
    colors = [
        "#E32987",
        "#F7275E",
        "#FB592F",
        "#FF8A00",
        "#FFA617",
        "#FFD300",
        "#D2E900",
        "#A4FF00",
        "#7BFE40",
        "#52FC80",
        "#00F8FF",
        "#29C6FF",
        "#5294FF",
        "#7B62FF",
        "#A42FFF",
        "#CE2BAF",
    ];
    random = Math.floor(Math.random() * colors.length);
    color = colors[random];
    return color;
}

function writeToFB(database, author, image, message) {
    let serverID = message.guild.id;
    let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);
    let todaysDate = new Date();
    let flagHasSubmitted = false;

    serverData.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
            message.channel.send("This server has no Caption Circuses running 😢");
        } else {
            let channelIDs = docSnapshot.data().eventChannelID;
            let submissionImage = image;
            for (let i = 0; i < channelIDs.length; i++) {
                if (channelIDs[i] == message.channel.id) {
                    flagHasSubmitted = true;
                    database
                        .collection(`servers/${serverID}/events`)
                        .doc("" + (i + 1))
                        .get()
                        .then(function (doc) {
                            if (doc.exists) {
                                let newSubmission = {
                                    votes: 0,
                                    userID: author.id,
                                    image: submissionImage,
                                    timeSubmitted: todaysDate.toLocaleString(),
                                };

                                if (
                                    docSnapshot.data().usersParticipating != undefined &&
                                    docSnapshot.data().usersParticipating.indexOf(author.id) > -1
                                ) {
                                    database
                                        .collection(`servers/${serverID}/events`)
                                        .doc("" + (i + 1))
                                        .update({
                                            usersParticipating: firebase.firestore.FieldValue.arrayUnion(
                                                author.id,
                                            ),
                                        });
                                }

                                database
                                    .collection(`servers/${serverID}/events`)
                                    .doc("" + (i + 1))
                                    .update({
                                        submissions: firebase.firestore.FieldValue.arrayUnion(
                                            newSubmission,
                                        ),
                                        submissionNum: firebase.firestore.FieldValue.increment(1),
                                        usersParticipating: firebase.firestore.FieldValue.increment(
                                            1,
                                        ),
                                    });
                            } else {
                                console.log("No such document in submit!");
                            }
                        })
                        .catch(function (error) {
                            console.log("Error getting document:", error);
                        });
                }
            }

            if (!flagHasSubmitted) {
                message.channel.send(
                    "Please run this command in the channel for a Caption Circus!",
                );
            } else {
                let roleMember = message.member.roles.cache.some(role => role.name === "🤡");
                let role = message.guild.roles.cache.find(r => r.name === "🤡");
                if (!roleMember && role) {
                    message.member.roles.add(role).catch(console.error);
                }
            }
        }
    });
}

function imgurShare(message, database, author, imageb64, sentence, showLink) {
    let imgurLink = "";
    request.post(
        {
            url: "https://api.imgur.com/3/image",
            headers: {
                Authorization: "Client-ID f85948549bb8939",
            },
            form: {
                image: imageb64,
                title: sentence,
                description: `this image has been generated in a discord caption-carnival, a game created by https://🤡.fm! this caption was given by the user ${author}`,
                type: "jpeg",
            },
        },
        function (error, response, body) {
            let parsedBody = JSON.parse(body);
            imgurLink = parsedBody.data.link;

            if (showLink === true) {
                let imgurLinkEmbed = new Discord.MessageEmbed()
                    .setColor(chooseRandomColor())
                    .setTitle("We've uploaded this image to imgur! Share it with your friend! 🎉")
                    .setDescription(imgurLink);

                message.channel.send(imgurLinkEmbed);
            } else {
                writeToFB(database, author, imgurLink, message);
            }
        },
    );
}

// html to image buffer
// fixes the issue of the image being sent late, without saving the image to disk
async function imgArrayBuffer(txt, url) {
    // jpeg tends to be much lighter because it doesn't need to have alpha values
    let image = await nodeHtmlToImage({
        html:
            '<html><head><style>* {box-sizing: border-box;} html {margin: 0;padding: 0;} body {padding: 1vw; display: flex; flex-direction: column; background: white; color: #0f0f0f;} .text {padding: 0 0 1vw 0; margin: 0; font-size: 4vw; font-family: sans-serif;} img {display: block;} .image-stack {display: grid; position: relative;} .image-stack-bottom {grid-column: 1; grid-row: 1;} .meme {border-radius: 2vw; width: 96vw;} .image-stack-top {right: -0.5vw; bottom: -0.5vw; position: absolute; z-index: 1;} .watermark {width: 25vw;}</style></head><body><div class="text">{{ text }}</div><div class="image-stack"><div class="image-stack-top"><img src="https://cdn.glitch.com/ccb090d8-d16c-470f-8417-d5ec02b21e4d%2Ffinal-watermark.png?v=1611773017399" alt="watermark" class="watermark"></div><div class="image-stack-bottom"><img src={{ imageUrl }} alt="meme" class="meme"></div></div></body></html>',
        puppeteerArgs: {
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--headless",
                "--disable-gpu",
                "--disable-dev-shm-usage",
            ],
        },
        content: {
            text: txt,
            imageUrl: url,
        },
        type: "jpeg",
        transparent: false,
    });
    return image;
}

function messageEmbedActions(embed, imageb64, sentence, author, message, database) {
    return message.channel
        .send(embed)
        .then(embedSubmissionMessage => {
            embedSubmissionMessage.react("📨");
            embedSubmissionMessage.react("⭐");
            embedSubmissionMessage.react("😄");
            embedSubmissionMessage.react("😋");
            embedSubmissionMessage.react("🤯");
            embedSubmissionMessage.react("🤩");

            const starFilter = (reaction, user) => {
                return reaction.emoji.name === "⭐" && !user.bot;
            };

            const shareFilter = (reaction, user) => {
                return reaction.emoji.name === "📨" && !user.bot;
            };

            embedSubmissionMessage
                .awaitReactions(shareFilter, {
                    max: 1,
                    time: 3.6e6,
                    errors: ["time"],
                })
                .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === "📨") {
                        imgurShare(message, database, author, imageb64, sentence, true);
                    }
                })
                .catch(err => console.log("error - ", err));

            embedSubmissionMessage
                .awaitReactions(starFilter, {
                    max: 1,
                    time: 3.6e6,
                    errors: ["time"],
                })
                .then(collected => console.log(collected.size))
                .catch(collected => {
                    let oldSubmission = {
                        votes: 0,
                        userID: submission.userID,
                        userSubmission: submission.userSubmission,
                        timeSubmitted: submission.timeSubmitted,
                    };

                    let newSubmission = {
                        votes: collected.size,
                        userID: submission.userID,
                        userSubmission: submission.userSubmission,
                        timeSubmitted: submission.timeSubmitted,
                    };

                    if (collected.size != 0) {
                        database
                            .collection(`servers/${serverID}/events`)
                            .doc("" + (i + 1))
                            .update({
                                submissions: firebase.firestore.FieldValue.arrayUnion(
                                    newSubmission,
                                ),
                            });

                        database
                            .collection(`servers/${serverID}/events`)
                            .doc("" + (i + 1))
                            .update({
                                submissions: firebase.firestore.FieldValue.arrayRemove(
                                    oldSubmission,
                                ),
                            });
                    }
                });
        })
        .catch(err => console.log("error: - ", err));
}

// buffer array (binary) to base64 encoded data
function buffer2b64(buffer) {
    const base64Str = btoa(
        new Uint8Array(buffer).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, ""),
    );
    return base64Str;
}

function attachImage(captionImage, sentence, author, message, database) {
    imgArrayBuffer(sentence, captionImage)
        .then(image => {
            const imgAttachment = new Discord.MessageAttachment(image, "caption.jpeg");
            var randColor = chooseRandomColor(); // chooses a random color for the embed

            let captionEmbed = new Discord.MessageEmbed()
                .setColor(randColor)
                .addField(`✨ 🎪 ✨`, `Created by <@${author.id}>`)
                .addField("caption [alt text] ⬇️", `${sentence}`)
                .setFooter(`Type ++help to learn how to make your own!`)
                .setTimestamp()
                .attachFiles(imgAttachment)
                .setImage("attachment://caption.jpeg");

            // imgur and firebase
            let imageb64 = buffer2b64(image);
            imgurShare(message, database, author, imageb64, sentence, false);

            return messageEmbedActions(captionEmbed, imageb64, sentence, author, message, database);
        })
        .catch(err => console.error(`there was an error: ${err}`));
}

module.exports = {
    name: "caption",
    description: "Caption the image provided in the MemeFest Server",
    guildOnly: true,
    dmOnly: false,
    execute(client, message, author, args, database) {
        // args[0] --> image url
        // args.slice(1, args.length).join() --> the sentence

        if (args.length < 1) {
            return message.channel.send(
                "Make sure your input is in the form `++caption <meme_text>`",
            );
        } // args >= 1 for sentence to have more than a word

        let serverID = message.guild.id;
        let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);
        let flagHasSubmitted = false;

        serverData.get().then(docSnapshot => {
            if (!docSnapshot.exists) {
                message.channel.send("This server has no Caption Circuses running 😢");
            } else {
                let channelIDs = docSnapshot.data().eventChannelID;
                for (let i = 0; i < channelIDs.length; i++) {
                    if (channelIDs[i] == message.channel.id) {
                        flagHasSubmitted = true;
                        database
                            .collection(`servers/${serverID}/events`)
                            .doc("" + (i + 1))
                            .get()
                            .then(function (doc) {
                                if (doc.exists) {
                                    let captionImage = doc.data().imageURL;
                                    let sentence = args.slice(0, args.length).join(" ");

                                    attachImage(captionImage, sentence, author, message, database);
                                    // return message.channel.send("there's the embed!");
                                } else {
                                    console.log("No such document in submit!");
                                }
                            })
                            .catch(function (error) {
                                console.log("Error getting document:", error);
                            });
                    }
                }

                if (!flagHasSubmitted) {
                    message.channel.send(
                        "Please run this command in the channel for a Caption Circus!",
                    );
                } else {
                    let roleMember = message.member.roles.cache.some(role => role.name === "🤡");
                    let role = message.guild.roles.cache.find(r => r.name === "🤡");
                    if (!roleMember && role) {
                        message.member.roles.add(role).catch(console.error);
                    }
                }
            }
        });
    },
};

// to-do - store image on firebase and then post the link on discord
