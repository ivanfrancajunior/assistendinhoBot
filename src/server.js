import { Client } from "tmi.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  connection: {
    reconnect: true,
  },
  channels: ["assistindinho", "jota_apenas"],
  identity: {
    username: process.env.TWITCH_BOT_NAME,
    password: process.env.OAUTH_TOKEN,
  },
});
client.connect();
let value = '';
async function setMovie(value) {
    if (value === null || '') return;

    let movie = value;
    
    const buscarFilme = async (movie) => {
    
      const movieApiKey = process.env.OMDB_API_KEY;
      const url = `http://www.omdbapi.com/?apikey=${movieApiKey}&t=${movie}&plot=full`;
    
      try {
        const res = await fetch(url);
        const data = await res.json();
        
        const movieInfo = {
          title: data.Title,
          sinopse: data.Plot,
          runtime: data.Runtime,
          year: data.Year,
          director: data.Year,
          rate: data.imdbRating,
          year: data.Year,
        };
        console.log(movieInfo);
    } catch (error) {
        console.log("erro", error.message);
      }
    };
      
    buscarFilme(movie)
  
}
setMovie("thor")


client.on("message", (channel, tags, message, self) => {
  const isNotBot =
    tags.username?.toLocaleLowerCase() !== process.env.TWITCH_BOT_NAME;

  if (isNotBot && message.toLowerCase() === "oi") {
    client.say(channel, `Olá @${tags.username} :D ${console.log(Date.now())}`);
  }
  if (isNotBot && message.toLowerCase() === "!hi") {
    // "@alca, heya!"
    client.say(channel, `@${tags.username}, heya!`);
  }
  if (tags.username === "jota_apenas" && message.includes("salve")) {
    client.say(channel, `@${tags.username}, salve meu patrão!`);
  }

  if (isNotBot && message.toLowerCase().includes("@assistindinho,")) {
    client.say(channel, `Oi fala comigo @${tags.username} `);
  }
  if (message.toLowerCase() === "!sinopse") {
    //TODO
    client.say(channel, `alguma sinopse... `);
  }
  if (message.toLowerCase() === "!duração") {
    //TODO
    client.say(channel, `alguma duração `);
  }
  if (message.toLowerCase() === "!tempo") {
    //TODO
    client.say(channel, `algum tempo `);
  }
  if (message.toLowerCase() === "!inicio") {
    //TODO
    client.say(channel, `algum inicio `);
  }
});
