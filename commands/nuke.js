const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Delete all messages in channel"),
  async execute(interaction) {
    // Clone channel
    const newChannel = await interaction.channel.clone();

    // Delete old channel
    interaction.channel.delete();
  },
};
