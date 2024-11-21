require('dotenv').config();
//Destructuring to import specific components from the discord.js library
//Clients = Main class used to interact with the discord API. (Allows us to handle events, send messages, join servers, and more)
//IntentsBitField = Used to Specify what events my bot listens to from the discord API like messages reactions etc (limits what data my bot has access to)
const {Client, IntentsBitField, EmbedBuilder} = require('discord.js');

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

client.on('interactionCreate', async (interaction) => {
    //code below will only run if the interaction was slash command
    if(!interaction.isChatInputCommand()) return;

    // INFO COMMAND FOR INFORMATION ABOUT THE BOT
    if (interaction.commandName === 'info')
    {
        // Create the Embed for the info command
       const embed = new EmbedBuilder()
            .setColor(0xFF6347) // Carnival red theme in hex
            .setTitle('Welcome to the Carnival Bot Info!')
            .setDescription("Here's some information about me!")
            .addFields
            (
                {name: 'Carnival Bot 🎪', value: `**${client.user.username}**`, inline: true},
                {name: 'Version', value:'**1.0.0**', inline: true},
                {name: 'Created By', value: '**EllaBloom**', inline: false},
                {name: 'Purpose', value: 'I love to Gamble 🎟 and go to the Carnival and thought why not bring it to discord!\n Play games, win prizes 🏆, and have fun!', inline: false},
                {name: 'Carnival Games Available', value: '🎰 Slot Machine\n🎯 Shooting Gallery\n🎳 Ring Toss\n🍿 Popcorn Machine', inline: true}
            )
            .setFooter({text: 'Visit the carnival often for more fun and games!🎪'})
            .setTimestamp();

            // Send the embed reply
            await interaction.reply({ embeds: [embed] });
    }

    // SLOTS COMMAND FOR SLOT GAME

    //SHOOTING GALLERY

    //RING TOSS

    //POPCORN MACHINE

    //PRIZES
    
    console.log(interaction.commandName);
    });

// Logging in the bot using the provided token)
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

// if (interaction.commandName === 'embedexample') {
//     // Create an embed
//     const exampleEmbed = new EmbedBuilder()
//         .setColor(0x00FF00) // Green color
//         .setTitle('🎉 Example Embed')
//         .setDescription('This is how an embed looks!')
//         .addFields(
//             { name: 'Field 1', value: 'Some value here', inline: true },
//             { name: 'Field 2', value: 'Another value', inline: true },
//             { name: 'Field 3', value: 'This one spans the full width.' }
//         )
//         .setFooter({ text: 'This is the footer text' })
//         .setTimestamp(); // Adds the current timestamp

//     // Reply with the embed
//     interaction.reply({ embeds: [exampleEmbed] });
// }