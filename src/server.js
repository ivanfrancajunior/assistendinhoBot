import { Client } from "tmi.js";
import dotenv from "dotenv";
dotenv.config();


const channelWatched = process.env.WATCH_CHANEL
const client = new Client({
  connection: {
    reconnect: true,
  },
  channels: [channelWatched],
  identity: {
    username: process.env.TWITCH_BOT_NAME,
    password: process.env.OAUTH_TOKEN,
  },
});

client.connect();

let movieInfo = {}; 

const buscarFilme = async (movie) => {
  const movieApiKey = process.env.OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?apikey=${movieApiKey}&t=${movie}`;

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
      realise: data.Released,
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
      return client.say(channel, `Estamos assitindo ao filme "${movieInfo.title}", @${tags.username}. Sinopse: ${movieInfo.sinopse} | Duração: ${movieInfo.runtime} | Lançamento:${movieInfo.realise}.`);
    }
  };
  const showSinopse = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Não temos um filme adicionado à fila.");
    } else {
      return client.say(channel, `Sinopse: ${movieInfo.sinopse}`);
    }
  };
  const showDuracao = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Não temos um filme adicionado à fila.");
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
  const showRealise = () => {
    if (!movieInfo.title) {
      return client.say(channel, "Não temos um filme adicionado à fila.");
    } else {
      return client.say(channel, `O filme foi lançado em ${movieInfo.realise}.`);
    }
  };

 // Chat spec
  if (isNotBot && message.toLowerCase() === "oi") {
    client.say(channel, `Olá @${tags.username} :D`);
  }

  if (isNotBot && message.toLowerCase().includes("@assistindinho,")) {
    client.say(channel, `Oi, fala comigo @${tags.username}`);
  }

  if (isNotBot && message.toLowerCase() === "!sinopse") {
    showSinopse();
  }

  if (isNotBot && message.toLowerCase() === "!duração") {
    showDuracao();
  }
  if (isNotBot && message.toLowerCase() === "!filme") {
    showMovie();
  }
  if (isNotBot && message.toLowerCase() === "!imdb") {
    showRating();
  }
  if (isNotBot && message.toLowerCase() === "!lançamento") {
    showRealise();
  }
  if (isNotBot && message.toLowerCase() === "!movieoptions") {
    client.say(channel,`Oi @${tags.username}, aqui está uma lista com meus autuais comandos: !sinopse, !duração, !filme, !imdb e !lançamento. ✌🏾`);
  }
});

