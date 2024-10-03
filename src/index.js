require('dotenv').config();
//Destructuring to import specific components from the discord.js library
//Clients = Main class used to interact with the discord API. (Allows us to handle events, send messages, join servers, and more)
//IntentsBitField = Used to Specify what events my bot listens to from the discord API like messages reactions etc (limits what data my bot has access to)
const {Client, IntentsBitField} = require('discord.js');

// Creating a new instance of the Client class, initializing the bot with specific intents
// Intents are flags that tell Discord what kind of events/data the bot will receive and process.
const client = new Client({
    intents:[
        // IntentsBitField.Flags.Guilds - Bot will listen to events related to guilds (servers)
        IntentsBitField.Flags.Guilds,
        // IntentsBitField.Flags.GuildMembers - Bot will listen to events related to guild members (e.g., when members join/leave)
        IntentsBitField.Flags.GuildMembers,
        // IntentsBitField.Flags.GuildMessages - Bot will listen to events related to messages sent in guild channels
        IntentsBitField.Flags.GuildMessages,
        // IntentsBitField.Flags.MessageContent - Bot will have access to the content of messages (important for bots that respond to message text)
        IntentsBitField.Flags.MessageContent,
    ],
});

// Registering an event listener for when the bot is ready (i.e., successfully connected to Discord and initialized)
// 'ready' event fires once when the bot logs in successfully
client.on('ready', (c => {
    console.log(`✅ ${c.user.tag} is online`);
}));

client.on('interactionCreate', (interaction) => {
    //code below will only run if the interaction was slash command
    if(!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey'){
        interaction.reply('hey!');
    }

    if (interaction.commandName === 'marco'){
        interaction.reply('Polo!!');
    }
    console.log(interaction.commandName);
    });

// Logging in the bot using the provided token (this is a mock token, replace it with your actual bot token)
client.login(process.env.TOKEN);

// ================= INTERACT WITH USERS ================= 
// //Interact with Users/ Guild Members
// client.on('messageCreate', (message) => {
//     // If Author is Bot Do not reply
//     if(message.author.bot){
//         return;
//     }
//     //Console log the content of the message
//     console.log(message.content);
//     //Reply to user if they say hello
//     if (message.content === 'hello'){
//         message.reply('hello');
//     }
// });