import { Client, GatewayIntentBits, Partials } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
import dotenv from "dotenv";
dotenv.config()
import fetch from 'node-fetch';
const jwtk = process.env.jwtk;

client.once("ready", () => {
  console.log("Bot started as " + client.user.tag)
  client.user.setActivity("something");
})

client.on("messageCreate", (msg) => {
  console.log(msg.content)
  const command = msg.content.slice(prefix.length)
  msg.reply(command)
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'clanmembers') {
    const clanMembersList = []
    fetch('https://api.clashofclans.com/v1/clans/%232QQYCLJVV/members', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtk}`
      }
    }).then((data) => {
      console.log("Is data ok: " + data.ok)
      data.json().then(clanMembers => {
        clanMembers['items'].forEach(member => {
          const memberData = []
          memberData.push(
            "\n**Tag**: " + member.tag +
            "\n**Name**: " + member.name +
            " -- **Role**: " + member.role +
            "\n**Donations**: " + member.donations +
            " -- **Donations Recieved**: " + member.donationsReceived +
            "\n--------------------------"
          )
          clanMembersList.push(memberData)
        });
        clanMembersList.push(`\n Total Members: ${clanMembers['items'].length}`)
        interaction.reply(`${clanMembersList}`)
      })
    })

  }
})

client.login(process.env.BOT_TOKEN)