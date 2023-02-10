const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("resumes the current song."),
  execute: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      return await interaction.reply("There is no song playing! Can't skip.");
    }

    const currentSong = queue.current;

    queue.setPaused(false);

    const embed = new EmbedBuilder()
      .setDescription(`Paused **${currentSong.title}**`)
      .setThumbnail(currentSong.thumbnail);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
