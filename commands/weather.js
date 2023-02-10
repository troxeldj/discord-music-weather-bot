/* Imports modules for command to function
 *  https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder
 *  https://discord.js.org/#/docs/builders/main/class/SharedNameAndDescription
 *  SlashCommandBuilder -> SharedNameAndDescription
 *
 * Axios for requests..
 * https://axios-http.com/docs/intro
 */
const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { weather_token } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather") // Sets name
    .setDescription("Gets weather for city!") // Sets command Description
    /* Adds string option for command.
     *   Option.setName -> Sets option name.
     *   Option.setDescription -> Sets option description.
     *   Option.setRequired -> Sets if option is required to use command.
     */
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("City you want weather for.")
        .setRequired(true)
    ),
  /* Get Weather data from openweathermap.org Weather API
   *  https://openweathermap.org/current
   *
   */
  async execute(interaction) {
    const cityName = interaction.options.getString("city");
    if (!cityName) {
      await interaction.reply("Invalid City Name!");
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${weather_token}`;
    const response = await axios.get(url);
    const data = await response.data;
    await interaction.reply(`:sun_with_face: **Weather in ${cityName}** :cloud:\
\n:thermometer: Temp: ${data.main.temp}°F\
\n:fire: Feels Like:  ${data.main.feels_like}°F \
\n:writing_hand: Description: ${data.weather[0].description}\n`);
  },
};
