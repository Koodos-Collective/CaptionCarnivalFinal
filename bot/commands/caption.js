const Discord = require("discord.js");
const htmlToImage = require("node-html-to-image");
const firebase = require("firebase");
const request = require("request");
require("firebase/firestore");

function imgurShare(message, db, author, imageLink) {
    let retrievedMemeURL = imageLink;

    let imgurLink = "";
    request.post({
            url: "https://api.imgur.com/3/image",
            headers: {
                Authorization: "Client-ID f85948549bb8939"
            },
            form: {
                image: retrievedMemeURL
            }
        },
        function (error, response, body) {
            let parsedBody = JSON.parse(body);
            imgurLink = parsedBody.data.link;

            let imgurLinkEmbed = new Discord.MessageEmbed()
                .setColor("#47EED2")
                .setTitle("We've uploaded this image to imgur! Share it with your friend! 🎉")
                .setDescription(imgurLink);

            message.channel.send(imgurLinkEmbed);
        }
    );
}

function writeToFB(database, author, image, message) {
    let serverID = message.guild.id;
    let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);
    let todaysDate = new Date();
    let flagHasSubmitted = false;

    serverData.get().then((docSnapshot) => {
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
                                    timeSubmitted: todaysDate.toLocaleString()
                                };

                                if (
                                    docSnapshot.data().usersParticipating != undefined &&
                                    docSnapshot.data().usersParticipating.indexOf(author.id) > -1
                                ) {
                                    database
                                        .collection(`servers/${serverID}/events`)
                                        .doc("" + (i + 1))
                                        .update({
                                            usersParticipating: firebase.firestore.FieldValue.arrayUnion(author.id)
                                        });
                                }

                                database
                                    .collection(`servers/${serverID}/events`)
                                    .doc("" + (i + 1))
                                    .update({
                                        submissions: firebase.firestore.FieldValue.arrayUnion(newSubmission),
                                        submissionNum: firebase.firestore.FieldValue.increment(1),
                                        usersParticipating: firebase.firestore.FieldValue.increment(1)
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
                message.channel.send("Please run this command in the channel for a Caption Circus!");
            } else {
                let roleMember = message.member.roles.cache.some((role) => role.name === "🤡");
                let role = message.guild.roles.cache.find((r) => r.name === "🤡");
                if (!roleMember && role) {
                    message.member.roles.add(role).catch(console.error);
                }
            }
        }
    });
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
            return message.channel.send("Make sure your input is in the form `++caption <meme_text>`");
        } // args >= 1 for sentence to have more than a word

        let serverID = message.guild.id;
        let serverData = database.collection(`servers/${serverID}/events`).doc(`serverData`);
        let flagHasSubmitted = false;

        serverData.get().then((docSnapshot) => {
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

                                    // console.log(`caption image: ${captionImage}`);
                                    // console.log(`sentence: ${sentence}`);

                                    htmlToImage({
                                            output: "./caption.png",
                                            type: "png",
                                            transparent: true,
                                            html: `<html>
                                        <style>
                                        html,
                                        body {
                                          overflow: none;
                                          margin: 0;
                                          padding: 0;
                                          height: 100%;
                                        }

                                        body {
                                          display: flex;
                                          align-items: center;
                                          justify-content: center;
                                        }

                                            * {
                                              box-sizing: border-box;
                                            }

                                            body {
                                              background: rgba(0, 0, 0, 0);
                                              height: 700px;
                                              width: 600px;
                                            }

                                            .container {
                                              background: #fff;
                                              padding: 10px;
                                              width: 570px;
                                            }

                                            .text {
                                                font-size: 24px;
                                                font-family: sans-serif;
                                                color: #0f0f0f;
                                                padding: 0 0 10px 0;
                                                margin: 0;
                                                text-align: left;
                                            }

                                            img {
                                              display: block;
                                            }

                                            .image-stack {
                                              display: grid;
                                              position: relative;
                                            }

                                            .image-stack-bottom {
                                              grid-column: 1;
                                              grid-row: 1;
                                            }

                                            .meme {
                                              border-radius: 10px;
                                              width: 550px;
                                              max-height: 550px;
                                            }

                                            .image-stack-top {
                                              right: -5px;
                                              bottom: -8px;
                                              position: absolute;
                                              z-index: 1;
                                            }
                                      </style>
                                      <body>
                                          <div class="container">
                                            <div class="text">{{ text }}</div>
                                            <div class="image-stack">
                                              <div class="image-stack-top">
                                                <img
                                                  src="https://cdn.glitch.com/ccb090d8-d16c-470f-8417-d5ec02b21e4d%2Ffinal-watermark.png?v=1611773017399"
                                                  alt="watermark"
                                                  height="28px"
                                                />
                                              </div>
                                              <div class="image-stack-bottom">
                                                <img
                                                  src="{{ imageUrl }}"
                                                  alt="meme"
                                                  class="meme"
                                                  width="550px"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </body>
                                      </html>`,
                                            content: {
                                                text: sentence,
                                                imageUrl: captionImage
                                            }
                                        })
                                        .then("the captioned image has been created!")
                                        .catch((error) => {
                                            console.log(`an error occured: ${error}`);
                                        });

                                    // https://discordjs.guide/popular-topics/embeds.html#attaching-images

                                    let submitEmbed = new Discord.MessageEmbed()
                                        .setColor("#47EED2")
                                        .addField(`✨ 🎪 ✨`, `Created by <@${author.id}>`)
                                        .setFooter(`Type ++help to learn how to make your own!`)
                                        .setTimestamp()
                                        .attachFiles(["./caption.png"])
                                        .setImage("attachment://caption.png");

                                    let imageLink = "https://i.kym-cdn.com/entries/icons/facebook/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.jpg"; //TODO REPLACE    
                                    writeToFB(database, author, "attachment://caption.png", message);

                                    return message.channel
                                        .send({
                                            embed: submitEmbed
                                        })
                                        .then((embedSubmissionMessage) => {
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
                                                    errors: ["time"]
                                                })
                                                .then((collected) => {
                                                    const reaction = collected.first();
                                                    if (reaction.emoji.name === "📨") {
                                                        imgurShare(message, database, author, imageLink);
                                                    }
                                                })
                                                .catch(console.log);

                                            embedSubmissionMessage
                                                .awaitReactions(starFilter, {
                                                    max: 1,
                                                    time: 3.6e6,
                                                    errors: ["time"]
                                                })
                                                .then((collected) => console.log(collected.size))
                                                .catch((collected) => {
                                                    let oldSubmission = {
                                                        votes: 0,
                                                        userID: submission.userID,
                                                        userSubmission: submission.userSubmission,
                                                        timeSubmitted: submission.timeSubmitted
                                                    };

                                                    let newSubmission = {
                                                        votes: collected.size,
                                                        userID: submission.userID,
                                                        userSubmission: submission.userSubmission,
                                                        timeSubmitted: submission.timeSubmitted
                                                    };

                                                    if (collected.size != 0) {
                                                        database
                                                            .collection(`servers/${serverID}/events`)
                                                            .doc("" + (i + 1))
                                                            .update({
                                                                submissions: firebase.firestore.FieldValue.arrayUnion(
                                                                    newSubmission
                                                                )
                                                            });

                                                        database
                                                            .collection(`servers/${serverID}/events`)
                                                            .doc("" + (i + 1))
                                                            .update({
                                                                submissions: firebase.firestore.FieldValue.arrayRemove(
                                                                    oldSubmission
                                                                )
                                                            });
                                                    }
                                                });
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
                    message.channel.send("Please run this command in the channel for a Caption Circus!");
                } else {
                    let roleMember = message.member.roles.cache.some((role) => role.name === "🤡");
                    let role = message.guild.roles.cache.find((r) => r.name === "🤡");
                    if (!roleMember && role) {
                        message.member.roles.add(role).catch(console.error);
                    }
                }
            }
        });
    }
};

// to-do - store image on firebase and then post the link on discord