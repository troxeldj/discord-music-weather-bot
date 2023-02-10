# Discord bot V2

## Features:
  - Music
    - Play (/play)
      - Playlist
      - Song
      - Search
    - Pause (/pause)
    - Resume (/resume)
    - Skip(/skip)
    - Queue (/queue)
    - Exit (/exit)
  - Weather (/weather)

## Libraries/Runtimes Used:
  - Node.js (https://nodejs.org/en/)
  - Discord.js (https://discord.js.org/#/)
  - discord-player (https://discord-player.js.org/)
  - axios (https://axios-http.com/docs/intro)
  - OpenWeatherMap Weather API's (https://openweathermap.org/)

## Other Resources:
  - https://discordjs.guide/
  - https://www.youtube.com/watch?v=3Iegimr8Qc0 (computeshorts)

## Instructions:
  - Git clone
  - cd into directory
  - make a config.json and put into root of directory (with index.js)
    - This config needs 4 entries
      - token -> Discord bot token
      - clientId -> Discord bot client ID
      - guildId -> server ID
      - weather_token -> OpenWeatherMap API token
	  - You may need to make FREE acc to use API's
   - node deploy-commands.js
     - This will add the commands in the command folder to server
   - node index.js
     - This will monitor slash commands in the server. 

