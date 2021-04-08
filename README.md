# Caption Carnival

*Caption Carnival is an open source project developed by [Hannah Guo](https://hannahguo.me/) and Sirat Baweja during their time at the [koodos collective](https://kcollective.substack.com/).*

Read more [here](https://kcollective.substack.com/).

## ✔️ Completed Bot Features
- About command `++about`
- Help commands `++help` and `++adminhelp`
- Role setup commands `++setup`
  - Role assignments whenever `++caption` is run and the user does not already have the role.
- New channels created using `++create` under a category
  - Creates category if the category does not already exist

## ❌ Incomplete Bot Features
- Fixing the bug where `++caption` generates the last caption rather than the current one
- Saving generated images from `++caption` to Firebase, though the infrastructure is set up. 
  - The infrastucture for pushing to Imgur is also set up, but isn't functional due to this.

## 🏃‍♀️ Locally Running the Bot
The following is the method based on what we used to test the bot:
- Clone repository
- Create a file called `config.js` and add variables under `module.exports` 
  - Command Prefix: `prefix` 
  - Discord bot token: `token`
  - Firebase Data: `apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId`
- Navigate to `/bot` directory 
- Install necessary libraries using `npm`
- Run bot using `nodemon index.js`

## Thank Yous
- **Jad Esber** for your support and mentorship 
- **Brandon Baraban** for your technical knowhow
- **the koodos collective** for being awesome people
