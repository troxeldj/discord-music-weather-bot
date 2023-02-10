const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song."),
  execute: async (interaction, client) => {
    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
      return await interaction.reply("There is no song playing! Can't skip.");
    }

    const currentSong = queue.current;

    queue.skip();

    const embed = new EmbedBuilder()
      .setDescription(`Skipped **${currentSong.title}**`)
      .setThumbnail(currentSong.thumbnail);
    
      await interaction.reply({
        embeds: [embed]
    })
  },
};
