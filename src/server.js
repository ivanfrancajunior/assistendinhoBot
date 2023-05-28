import { Client } from "tmi.js";
import fetch from "node-fetch"; // Importe a biblioteca "node-fetch" para fazer a requisição HTTP
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

let movieInfo = {}; // Variável global para armazenar as informações do filme

const buscarFilme = async (movie) => {
  const movieApiKey = process.env.OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?apikey=${movieApiKey}&t=${movie}&plot=full`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    movieInfo = {
      title: data.Title,
      sinopse: data.Plot,
      runtime: data.Runtime,
      year: data.Year,
      director: data.Director,
      rate: data.imdbRating,
    };

    console.log(movieInfo);
  } catch (error) {
    console.log("Erro:", error.message);
  }
};

client.on("message", (channel, tags, message, self) => {
  const isNotBot = tags.username?.toLowerCase() !== process.env.TWITCH_BOT_NAME;

  //Adicionar um filme
  if (isNotBot && message.toLowerCase().startsWith("!setfilme ")) {
    const movie = message.slice(10); // Remove o prefixo "!setfilme "

    console.log(movie);

    buscarFilme(movie);

    if (movie !== "" || null) {
      client.say(channel, `O filme "${movie}" foi adicionado por ${tags.username}`);
    } else {
      client.say(channel, `Ocorreu um erro ao adicionar o filme, @${tags.username}`);
    }
  }

  
  // Comandos 
  const showMovie = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Você ainda não adicionou um filme.");
    } else {
      return client.say(channel, `Estamos assitindo o filme "${movieInfo.title}", @${tags.username} -  Sinopse: ${movieInfo.sinopse} - Duração: ${movieInfo.runtime}`);
    }
  };

  const showSinopse = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Você ainda não adicionou um filme.");
    } else {
      return client.say(channel, `Sinopse: ${movieInfo.sinopse}`);
    }
  };

  const showDuracao = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Você ainda não adicionou um filme.");
    } else {
      return client.say(channel, `Duração: ${movieInfo.runtime}`);
    }
  };
  const showRating = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Você ainda não adicionou um filme.");
    } else {
      return client.say(channel, `Segundo a IMDB o filme teve ${movieInfo.rate} de nota.`);
    }
  };

 // Chat spec
  if (isNotBot && message.toLowerCase() === "oi") {
    client.say(channel, `Olá @${tags.username} :D`);
  }

  if (isNotBot && message.toLowerCase().includes("@assistindinho,")) {
    client.say(channel, `Oi, fala comigo @${tags.username}`);
  }

  if (message.toLowerCase() === "!sinopse") {
    showSinopse();
  }

  if (message.toLowerCase() === "!duração") {
    showDuracao();
  }
  if (message.toLowerCase() === "!filme") {
    showMovie();
  }
  if (message.toLowerCase() === "!imdb") {
    showRating();
  }
});

