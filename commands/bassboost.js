const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bassboost")
    .setDescription("Enables or Disables Bass Boost")
    .addStringOption((option) =>
      option
        .setName("toggle")
        .setDescription("turn on or off")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // Not on or off
    console.log(interaction.options.getString("toggle"));
    console.log(typeof interaction.options.getString("toggle"));
    if (
      interaction.options.getString("toggle") != "on" &&
      interaction.options.getString("toggle") != "off"
    ) {
      return await interaction.reply(
        "Not a valid toggle setting. Please specify on or off"
      );
    }

    const queue = client.player.getQueue(interaction.guildId);

    // Queue is empty
    if (!queue || !queue.playing) {
      return await interaction.reply("Music is not playing currently!");
    }

    // On
    if (interaction.options.getString("toggle") === "on") {
      queue.setFilters({
        bassboost: true,
        normalizer2: true,
      });
      return await interaction.reply("🎵 Bassboost: ON");
    } else {
      queue.setFilters({
        bassboost: false,
        normalizer2: false,
      });
      return await interaction.reply("🎵 Bassboost: OFF");
    }
  },
};
