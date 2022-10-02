const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('For Testing (obv).'),
  async execute(interaction) {
    await interaction.reply('Testing Complete!');
  },
};
