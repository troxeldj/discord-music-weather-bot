const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song."),
  execute: async (interaction, client) => {

    const queue = client.player.getQueue(interaction.guild);
    console.log(queue)

    if (!queue) {
      await interaction.reply("There is no song playing! Can't Pause");
      return
    }

    const currentSong = queue.current;

    queue.setPaused(true);

    const embed = new EmbedBuilder()
      .setDescription(`Paused **${currentSong.title}**`)
      .setThumbnail(currentSong.thumbnail);
    
      await interaction.reply({
        embeds: [embed]
    })
  },
};
