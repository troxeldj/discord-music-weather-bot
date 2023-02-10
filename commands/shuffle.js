const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles playlist and plays songs!")
    .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("the playlist's url")
            .setRequired(true)
        ),
  execute: async (interaction, client) => {
    if (!interaction.member.voice.channel)
      return interaction.reply(
        "You need to be in a Voice Channel to play a song."
      );

    // Create a play queue for the server
    const queue = await client.player.createQueue(interaction.guild);
    
    // Wait until you are connected to the channel
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new EmbedBuilder();

    // Search for the playlist using the discord-player
    let url = interaction.options.getString("url");
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (result.tracks.length === 0)
      return interaction.reply(`No playlists found with ${url}`);

    // Add the tracks to the queue
    const playlist = result.playlist;
    await queue.addTracks(result.tracks);
    shuffle(queue.tracks)
    embed
      .setDescription(
        `**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`
      )
      .setThumbnail(playlist.thumbnail.url);

    // Play the song
    if (!queue.playing) await queue.play();

    // Respond with the embed containing information about the player
    await interaction.reply({
      embeds: [embed],
    })
  }
}
