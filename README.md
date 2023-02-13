# 🤖  Discord bot V2 🤖

## Features 🔧
  - Music 🎵
    - Play (/play)
      - Playlist
      - Song
      - Search
    - Pause (/pause)
    - Resume (/resume)
    - Skip (/skip)
    - Queue (/queue)
    - Bass Boost (/bassboost)
    - Exit (/exit)
  - Weather ⛅
  - Ping 🏓
  - Nuke ☢️
  - MORE TO COME

|Command   | Syntax   | Description   |
|:---:|:---|:---|
| Play Song   | /play song \<url>   | Plays a song in current voice Channel at the given URL  |
|Play Playlist| /play playlist \<url> | Adds playlist songs to song queue and plays them in voice chat.
| Play search | /play search \<url> | Searches for a song on youtube and then plays it in the current voice channel.
| Pause | /pause | Pauses currently playing song in queue.
| Resume | /resume | Resumes playback of the song currently playing / top of queue.
| Skip | /skip | Skips to the next song in the queue and starts playing that.
| Queue | /queue | Displays the first ten items present in the queue.
| Bass Boost | /bassboost <on/off> | Will turn on bass boost filter for music playback.
| Exit | /exit | Will destroy queue and bot exits voice channel.
| Weather | /weather \<city> | Will give weather given city name using Weather API
| Ping | /ping | A basic testing command. You /ping and the bot replies "pong".
| Nuke | /nuke | Removes all messages in the text channel the command is used in.

## Instructions:
  1. Git clone
  2. cd into directory
  3. make a config.json and put into root of directory (with index.js)
    - This config needs 4 entries
      - token -> Discord bot token
      - clientId -> Discord bot client ID
      - guildId -> server ID
      - weather_token -> OpenWeatherMap API token
	  - You may need to make FREE acc to use API's
  4. node deploy-commands.js
     - This will add the commands in the command folder to server
  5. node index.js
     - This will monitor slash commands in the server. 

## Current Known Issues
 - Spotify playlists can only add 100 songs to the queue
   - Issue has been acknowledged by discord-player team but may look for another way to import spotify playlists.

## Libraries/Runtimes Used:
  - [Node.js](https://nodejs.org/en/)
  - [Discord.js](https://discord.js.org/#/)
  - [discord-player](https://discord-player.js.org/)
  - [axios](https://axios-http.com/docs/intro)
  - [OpenWeatherMap Weather API](https://openweathermap.org/)

## Other Resources:
  - https://discordjs.guide/
  - https://www.youtube.com/watch?v=3Iegimr8Qc0 (computeshorts)