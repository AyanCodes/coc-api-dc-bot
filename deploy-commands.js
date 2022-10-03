const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require("dotenv")
dotenv.config()

const commands = [
	new SlashCommandBuilder()
		.setName('clanmembers')
		.setDescription('List clan members'),
	new SlashCommandBuilder()
		.setName('clan')
		.setDescription('Info about clan'),
	new SlashCommandBuilder()
		.setName('clanwars')
		.setDescription('Info about clan wars')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
