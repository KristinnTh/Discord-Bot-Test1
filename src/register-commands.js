require('dotenv').config();
const{ REST, Routes } = require('discord.js');

//Define commands
const commands = [
    {
        name: 'info',
        description: 'Get Information about the bot!',
    },
    {
        name:'slot',
        description: 'Try your luck at our slot machine!',
    },
    {
        name:'ringtoss',
        description: 'Win Big in ringtoss!',
    },
    {
        name:'balance',
        description: 'Check How many tickets you have!',
    },
    {
        name:'shoot',
        description: 'Check out our shooting gallery to test your reaction time!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an Error: ${error}`);
    }
})();