require('dotenv').config();
//Destructuring to import specific components from the discord.js library
//Clients = Main class used to interact with the discord API. (Allows us to handle events, send messages, join servers, and more)
//IntentsBitField = Used to Specify what events my bot listens to from the discord API like messages reactions etc (limits what data my bot has access to)
const {Client, IntentsBitField, EmbedBuilder} = require('discord.js');
const db = require('../config/db'); // database


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

// Set up an event listener for interactions
// Interactions are actions like slash commands, buttons, or context menu clicks
client.on('interactionCreate', async (interaction) => {
    //code below will only run if the interaction was slash command
    if(!interaction.isChatInputCommand()) return;

    // ================= INFO COMMAND =================
    // This block handles the `/info` command, which shows information about the bot
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
                {name: 'Carnival Games Available', value: '🎰 Slot Machine\n🎯 Shooting Gallery\n⭕ Ring Toss\n🍿 Popcorn Machine', inline: true}
            )
            .setFooter({text: 'Visit the carnival often for more fun and games!🎪'})
            .setTimestamp();

            // Send the embed reply
            await interaction.reply({ embeds: [embed] });
    }

    // ================= SLOT MACHINE GAME =================
    // This block handles the `/slot` command, which simulates a slot machine game
    if (interaction.commandName === 'slot')
    {
        //Simulate slot machine spin
        const symbols = ['🍎', '🍊', '🍒', '🍋‍🟩', '🍇', '💸', '💎'];
        const result = 
        [
            //Symbols is the array above
            //Math.random() generates a random floating-point number between 0 inclusive and 1 exclusive. Its used in this case to randomly pick an index from the symbols array.
            //Math.random() * symbols.length: this multiplies the random value by the length of the symbols array.
            //Math.floor(): This function rounds down the value to the nearest whole number so its a valid index for the array elements.
            //the whole line below accesses a random element from the symbols array using the randomly generated index.
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
        ];

        //Check if they won
        const isWinner = result[0] === result[1] && result [1] === result[2];

        //Create an embed for the slot machine result
        const embed = new EmbedBuilder()
            .setColor(0xAFACAC)
            .setTitle('🎰 Slot Machine 🎰')
            .setDescription(isWinner ? 'Congratulations! You won!' : 'Better luck next time!')
            .addFields
            (
                //Display the spin result and the prize
                {name: 'Your Spin:', value:`${result[0]}${result[1]}${result[2]}`, inline: true},
                { name: 'Prize:', value: isWinner ? '🎉 Jackpot!' : '❌ No prize this time.', inline: true }
            )
            .setFooter({ text: 'Spin again to try your luck!' });
        // Reply with the embed
        await interaction.reply({ embeds: [embed] });
    }
    //SHOOTING GALLERY
    if(interaction.commandName === 'shoot')
    {
        // targets here
        const targets = ['🪿', '🎯', '🦢', '⭐', '🦆',];
        const correctTarget = '🎯'; //This is the target the player must shoot

        // Shuffle or randomize target positions
        const shuffledTargets = targets.sort(() => Math.random() - 0.5);

        // create embed
        const embed = new EmbedBuilder()
        .setColor(0xfff)
        .setTitle('🎯 SHOOTING GALLERY 🎯')
        .setDescription(`React to the **${correctTarget}** within 5 seconds!`)
        .addFields
        (
            {name:'Targets:', value: shuffledTargets.join(' ') }
        );

        // Defer the reply to allow more time
        await interaction.deferReply();

        // Send the embed and get the sent message object
        const sentMessage = await interaction.channel.send({ embeds: [embed] });

        // Add reactions for the targets
        for (const target of shuffledTargets) 
        {
            await sentMessage.react(target);
        }

        // Create a filter to listen for reactions (from the same user who triggered the command)
        const filter = (reaction, user) => 
        {
            console.log('Filtering:', reaction.emoji.name);
            return shuffledTargets.includes(reaction.emoji.name) && user.id === interaction.user.id;
        };

        // Await a reaction from the user within 5 seconds
        try 
        {
            const collected = await sentMessage.awaitReactions({
                filter,
                max: 1, // Only need the first reaction
                time: 5000, // 5 seconds timeout
                errors: ['time'], // Error if no reaction within time limit
            });

            // Get the first reaction
            const reaction = collected.first();

            // Check if the reaction is the correct target
            if (reaction.emoji.name === correctTarget) 
            {
                const successEmbed = new EmbedBuilder()
                    .setColor(0x32CD32) // Green color for success
                    .setTitle('🎯 SHOOTING GALLERY 🎯')
                    .setDescription('🎉 You hit the target! Well done!')
                    .addFields({ name: 'You hit:', value: correctTarget, inline: true })
                    .setFooter({ text: 'Congratulations! Try again for more fun!' });

                // Reply with success message
                await interaction.reply({ embeds: [successEmbed] });
            } 
            else 
            {
            const failEmbed = new EmbedBuilder()
                .setColor(0xFF6347) // Red color for failure
                .setTitle('🎯 SHOOTING GALLERY 🎯')
                .setDescription('❌ You missed the target. Better luck next time!')
                .addFields({ name: 'You hit:', value: reaction.emoji.name, inline: true })
                .setFooter({ text: 'Try again and aim carefully!' });

            // Reply with failure message
            await interaction.reply({ embeds: [failEmbed] });
            }

        } 
        catch (err) 
        {
            // If no reaction within 5 seconds
            const timeoutEmbed = new EmbedBuilder()
                .setColor(0xFFA500) // Orange color for timeout
                .setTitle('🎯 SHOOTING GALLERY 🎯')
                .setDescription('⏰ Time’s up! You missed your chance to shoot.')
                .setFooter({ text: 'Better luck next time!' });

            await interaction.reply({ embeds: [timeoutEmbed] });
        }
    }

    // ================= Balance =================
    if (interaction.commandName === 'balance')
    {
        //get user discord id
        const userId = interaction.user.id;
        console.log("User ID:", userId); //Log the user ID being used

        //Query the database for the user's ticket balance
        const getBalanceQuery =
        `SELECT t.ticket_count
        FROM users u
        INNER JOIN tickets t ON u.id = t.user_id
        WHERE u.discord_id = ?`;


        db.query(getBalanceQuery, [userId], (err, results) => 
        {
            if(err)
            {
                console.error('Error fetching ticket balance:', err);
                return interaction.reply({content: 'sorry, there was an error fetching your balance. Please try again later.', ephemeral: true});
            }

            // Check if the user exists in the database
            if (results.length > 0)
            {
                const ticketCount = results[0].ticket_count;

                //Create an Embed to display the balance
                const embed = new EmbedBuilder()
                .setColor(0xFFD700)//Gold color for tickets
                .setTitle('🎟️ Ticket Balance')
                .setDescription(`You currently have **${ticketCount} tickets**.`)
                .setFooter({text: 'Play more games to earn more tickets!' })
                .setTimestamp();

                // Reply with the balance embed
                interaction.reply({ embeds: [embed] });
            }
            else
            {
                // User has no tickets in the database
                interaction.reply({ content: 'You have no tickets yet. Play some games to start earning!', ephemeral: true });       
            }
        });
    }
     // ================= RING TOSS GAME =================
    if (interaction.commandName === 'ringtoss')
    {
        //Define possible peg targets and their associated prizes
        const pegs = 
        [
            {name: '🔴 Red Peg', prize: '🎁 Small Prize', tickets: 5},
            {name: '🔵 Blue Peg', prize: '🎉 Medium Prize', tickets: 15},
            {name: '🟢 Green Peg', prize: '🎊 Grand Prize', tickets: 30},
            {name: '❌ Miss', prize: '💔 No Prize', tickets: 0},
        ];

        //Randomly determine the result
        const tossResult = pegs[Math.floor(Math.random() * pegs.length)];

        //Create an embed for the slot machine result
        const embed = new EmbedBuilder()
            .setColor(0xAFACAC) // neutral color
            .setTitle('⭕ Ring Toss')
            .setDescription('You tossed a ring...')
            .addFields
            (
                {name: 'Target:', value: tossResult.name, inline: true},
                {name: 'Prize:', value: tossResult.prize, inline: true},
                {name: 'Tickets Won:', value: `${tossResult.tickets}`, inline: true}
            )
            .setFooter({ text: 'Try again to win big!' });
        
        // Reply with the embed
        await interaction.reply({ embeds: [embed] });

        // If the user wins tickets, add to their total
        if (tossResult.tickets > 0) 
        {
            const userId = interaction.user.id;// Identify the user who played the game.
            addTicketsToUser(userId, tossResult.tickets); // Custom function for ticket storage
        }
    }

    //POPCORN MACHINE
    if (interaction.commandName === 'popcorn')
    {

    }

    //PRIZES

     // Function to add tickets (simple in-memory storage)
    function addTicketsToUser(discord_id, tickets) 
    {
        //First check if the user exists in the users table
        const checkUserQuery = 'SELECT id FROM users WHERE discord_id = ?';
        db.query(checkUserQuery, [discord_id], (err, result) => 
        {
            if (err)
            {
                console.error('Error checking user in users table:', err);
                return;
            }

            if (result.length > 0)
            {
                //User exists so get their user_id
                const user_id = result[0].id;

                //check if the user already has a record in the tickets table
                const checkTicketsQuery = 'SELECT * FROM tickets WHERE user_id = ?';
                db.query(checkTicketsQuery, [user_id], (err, ticketResults) => 
                {
                    if (err)
                    {
                        console.error('Error checking tickets table:', err);
                        return;
                    }

                    if (ticketResults.length > 0)
                    {
                        // if the user already has tickets, update the ticket count
                        const updateTicketsQuery = 'UPDATE tickets SET ticket_count = ticket_count + ? WHERE user_id = ?';
                        db.query(updateTicketsQuery, [tickets, user_id], (err, updateResults) => 
                        {
                            if (err)
                            {
                                console.error('Error updating tickets:', err);
                            } 
                            else
                            {
                                console.log(`${tickets} tickets added to user ${discord_id}`);
                            }
                        });
                    } 
                    else
                    {
                        //if the user doesn't have tickets, insert a new record
                        const insertTicketsQuery = 'INSERT INTO tickets (user_id, ticket_count) VALUES (?, ?)';
                        db.query(insertTicketsQuery, [user_id, tickets], (err, insertResults) => 
                        {
                            if (err)
                            {
                                console.error('Error inserting tickets:', err);
                            } 
                            else
                            {
                                console.log(`${tickets} tickets added to user ${discord_id}`);
                            }
                        });
                    }
                });
            } 
            else
            {
                // user does not exist, so insert them
                const insertUserQuery = 'INSERT INTO users (discord_id, username) VALUES (?, ?)';
                db.query(insertUserQuery, [discord_id, interaction.user.username], (err, insertResults) => {
                    if (err){
                        console.error('Error inserting user:', err);
                        return;
                    }
                    console.log(`User with Discord ID ${discord_id} does not exist in the database.`);

                    //Call the addTicketstoUser function again now that user created
                    addTicketsToUser(discord_id, tickets);
                });
            }
        });
    }
    
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