// Requires... Modules needed for project.
// Discord JS basically lets us interact with the Discord API from node.
const fs = require("node:fs");
const path = require("node:path");
const { clientId, guildId, token, weather_token } = require("./config.json");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");

/* Create an instance of Discord.js Client Class
   EventEmitter -> BaseClient -> Client
 Client: The main hub for interacting with the Discord API, and the starting point for any bot.
*/
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// client.commands = Collection
/*
discord.js comes with a utility class known as Collection. 
It extends JavaScript's native Map class, so it has all the Map features and more!
*/
client.commands = new Collection();

// Music Player
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

/* Set Command path.. commandsPath = ({scriptdirectory}/commands)
 *  Get Command Files.. fs.readdirSync -> array of files.... filter -> files ending in .js
 */
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

/* Loop through command file names and load them as modules.
 *  EX:
 *   client.commands.ping = {data: new SlashCommandBuilder, async execute(int).....}
 */
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

/* EventEmitter -> BaseClient -> Client
 *  Calls EventEmitter.once.. This method adds a onetime listener to the listener array..
 *  Listens for ClientReady event.
 *  https://discord.js.org/#/docs/discord.js/main/typedef/Events
 *  https://discord.js.org/#/docs/main/main/class/Client?scrollTo=e-ready
 */
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

/* EventEmitter -> BaseClient -> Client
 *  Calls EventEmitter.on.. This method adds an event listener to the listener array..
 *  The listener listens for interactions. Checks if it's a command and runs that commands 'execute' method
 *
 * ChatInputCommandInteraction -> https://discord.js.org/#/docs/main/main/class/ChatInputCommandInteraction
 */
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return; // is ChatInputCommandInteraction? (boolean)

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found!`);
    return;
  }

  if (
    interaction.commandName === "play" ||
    interaction.commandName === "pause" ||
    interaction.commandName === "resume" ||
    interaction.commandName === "skip" ||
    interaction.commandName === "queue" ||
    interaction.commandName === "shuffle" ||
    interaction.commandName === "exit"
  ) {
    try {
      await command.execute(interaction, client);
      return;
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "There was an error while executing this command!",
      });
    }
  }

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "There was an error while executing this command!",
    });
  }
});

/* Log in to Discord with your client's token
 *  https://discord.js.org/#/docs/discord.js/main/class/Client?scrollTo=login
 *
 *  .login(token)
 *  Logs the client in, establishing a WebSocket connection to Discord.
 */
client.login(token);

