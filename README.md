# Caption Carnival

*Caption Carnival is an open source project developed by [Hannah Guo](https://hannahguo.me/) and [Sirat Baweja](https://sirat.xyz/) during their time at the [koodos collective](https://kcollective.substack.com/).*

Read more [here](https://kcollective.substack.com/).

## ✔️ Completed Bot Features

- Role setup commands `++setup`
  - Role assignments whenever `++caption` is run and the user does not already have the role.
- New channels created using `++create` under a category
- Creates category if the category does not already exist
- Fixed the bug where `++caption` generates the last caption rather than the current one
- Saved the array buffer to base64 encoded images to imgur
- Saved the links of the imgur images to firebase instead of the images to manage memory.
- Created a dockerfile that works perfectly for the bot to run with headless chrome (to run puppeteer and fix the issue of the weird emojis)
- Made image embeds appear in an embed when using `++caption`
- Created a custom message for the bot that is sent the moment it enters a server

## ❌ Incomplete Bot Features

- Updating the about command `++about`
- Updating the help commands `++help` and `++admin`

## 🏃‍♀️ Running the Bot Locally

The following is the method based on what we used to test the bot:

- Clone this repository and change the current directory to the one with all of the repository's files.

```bash
git clone https://github.com/Koodos-Collective/caption-carnival.git
cd caption-carnival
```

- Move the contents of the `.env.example` file in the `/bot` directory into a new file called `.env`.

```bash
cd bot
mv .env.example .env
```

- Add all the details the `.env` file requires.
  - Command Prefix: `PREFIX`
  - Discord bot token: `TOKEN`
  - Firebase Data: `API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID`

- You can run the bot in two different ways:
    1. Using `npm`

        ```bash
        # install all dependencies
        npm i

        # start the bot
        npm start
        ```

    2. Using `docker`

        ```bash
        # build the docker container
        docker build -t <container_name> .

        # run it via an interactive terminal (great for debugging!)
        docker run -it <container_name>
        ```

## Thank Yous

- **Jad Esber** for your support and mentorship
- **Brandon Baraban** for your technical knowhow
- **the koodos collective** for being awesome people

## Wanna know more?

Read more about our project [here](https://kcollective.substack.com/embed)! Coming soon.
