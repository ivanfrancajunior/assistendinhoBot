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
    
    // if (isNotBot) {
    //     client.say(channel, `Message : "${message}" was send to ${tags.username}`)
    // }
    if(message.toLowerCase() === '!hi') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
    }
    if (tags.username === 'jota_apenas' && message.includes('salve')){
        client.say(channel, `@${tags.username}, salve meu patrão!`)
    }
	console.log(`${tags['display-name']}: ${message}`);
});
		