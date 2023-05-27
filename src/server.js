import { Client } from 'tmi.js';
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    connection: {
        reconnect: true
    },
    channels: [ 'assistindinho' ],
    identity: {
		username: process.env.TWITCH_BOT_NAME,
        password: process.env.OAUTH_TOKEN
	},
},);

client.connect();

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username.toLocaleLowerCase() !== process.env.TWITCH_BOT_NAME
    
    if (isNotBot && message.toLowerCase() === 'oi') {
        client.say(channel, `Olá @${tags.username} :D`)
    }
    if(message.toLowerCase() === '!hi') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
    }
    if (tags.username === 'jota_apenas' && message.includes('salve')){
        client.say(channel, `@${tags.username}, salve meu patrão!`)
    }

    if (isNotBot && message.toLowerCase() === '@assistindinho, tá ai?') {
        client.say(channel, `Oi fala comigo @${tags.username} `)
    }
    if (message.toLowerCase() === '!sinopse') {
        //TODO
        client.say(channel, `alguma sinopse... `)
    }
    if (message.toLowerCase() === '!duração') {
        //TODO
        client.say(channel, `alguma duração `)
    }
    if (message.toLowerCase() === '!tempo') {
        //TODO
        client.say(channel, `algum tempo `)
    }
    if (message.toLowerCase() === '!inicio') {
        //TODO
        client.say(channel, `algum inicio `)
    }
    
});
		