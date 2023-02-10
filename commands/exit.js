const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Clears queue and kicks bot from voice channel"),
  execute: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      return await interaction.reply("There is no song playing");
    }

    queue.destroy();

    await interaction.reply("Why u kick me doe??");
  },
};
