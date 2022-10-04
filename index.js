const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const dotenv = require("dotenv")
dotenv.config()

const { Client: ClashClient } = require("clashofclans.js");
const coc = new ClashClient();

client.once("ready", async () => {
  console.log("Bot started as " + client.user.tag)
  await coc.login({ email: process.env.EMAIL, password: process.env.PASSWORD });
})

function getWLR(wins, losses) {
  const wlr = (wins * 10) / (losses * 10)
  return wlr.toString()
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const clan = await coc.getClan('#2QQYCLJVV');

  if (commandName === 'clan') {
    const clanDetailsEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`${clan.name} ${clan.tag} Clan details`)
      .setThumbnail(clan.badge.medium)
      .addFields(
        { name: 'Description: ', value: clan.description },
        { name: 'Level: ', value: clan.level.toString(), inline: true },
        { name: 'Points: ', value: clan.points.toString(), inline: true },
        { name: 'Members: ', value: clan.memberCount.toString(), inline: true },
        { name: 'Location: ', value: clan.location.name.toString(), inline: true },
        { name: 'Language: ', value: clan.chatLanguage.name, inline: true },
        { name: 'Clan type: ', value: clan.type, inline: true },
        { name: 'Required Townhall level: ', value: clan.requiredTownHallLevel.toString(), inline: true },
        { name: 'Required Trophies: ', value: clan.requiredTrophies.toString(), inline: true },
        { name: 'Required Versus trophies: ', value: clan.requiredVersusTrophies.toString(), inline: true },
      )
    await interaction.reply({ embeds: [clanDetailsEmbed] })
  }

  if (commandName === "clanwars") {
    const clanWarsEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`${clan.name} ${clan.tag} Clan War info`)
      .setThumbnail(clan.badge.medium)
      .addFields(
        { name: 'War Frequency', value: clan.warFrequency, inline: true },
        { name: 'War Wins: ', value: clan.warWins.toString(), inline: true },
        { name: 'War Winstreak: ', value: clan.warWinStreak.toString(), inline: true },
        { name: 'War Losses: ', value: clan.warLosses.toString(), inline: true },
        { name: 'War WLR: ', value: getWLR(clan.warWins, clan.warLosses), inline: true },
        { name: 'War Ties: ', value: clan.warTies.toString(), inline: true },
      )
    await interaction.reply({ embeds: [clanWarsEmbed] })
  }
})

client.login(process.env.BOT_TOKEN)