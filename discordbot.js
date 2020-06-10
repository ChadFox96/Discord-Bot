// // reference: https://izy521.gitbooks.io/discord-io/content/

// // Dependencies for running the bot
// var Discord = require('discord.io'); // JS library for Discord

// // Initialization, create the bot "object"
// //https://izy521.gitbooks.io/discord-io/content/Client.html
// var bot = new Discord.Client({
//     token: "NzIwMjA4ODI5OTEyMDU1ODc5.XuCxZg.Oo7waWuJDMC1AyyuEKZk6a1uudc", // Used for bot login
//     autorun: true // Connect immediately
// });
// console.log("test");
// // Events
// //https://izy521.gitbooks.io/discord-io/content/Events/Client.html

// // When the bot starts
// bot.on('ready', function (event) {
//     console.log('Logged in as %s - %s\n', bot.username, bot.id);
//     console.log("test");
// });

// // When chat messages are received
// bot.on("message", function (user, userID, channelID, message, rawEvent) {
//     //http://www.w3schools.com/jsref/jsref_substring.asp
//     if (message.substring(0, 1) == "!") // if message starts with "!"
//     {
//         var command = message.substring(1); // store the command for cleaner code/reading

//         if (command == "hey") {
//             //https://izy521.gitbooks.io/discord-io/content/Methods/Channels.html
//             bot.sendMessage({
//                 to: channelID,
//                 message: "Hello!"
//             });
//         }
//     }
// });

const Discord = require("discord.js")
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');

const client = new Discord.Client()
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => { 

    if (!msg.content.startsWith('?')) return;

    const withoutPrefix = msg.content.slice(1);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
    const args = split.slice(1);
    

    if (command === 'cat') {
        const { file } = fetch('https://aws.random.cat/meow').then(response => response.json());
    
        msg.channel.send(file);
    }

    if(command === 'avatar')
    {

    
        const message = msg;
        console.log(msg.mentions.users)
        if (args[0]) {
            const user = getUserFromMention(args[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
            }
    
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
        }

        // return message.channel.send(`${msg.mentions.user.id}'s avatar: ${msg.mentions.user[0].displayAvatarURL({ dynamic: true })}`);
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
     }


  if (msg.content === "ping") {
    msg.reply("Pong!")
  }


  if(msg.content === "Liam is a puta")
  {
      msg.reply("He only speaks the truth")
  }

  if(msg.content === "Chad has no mates")
  {
      msg.reply("Filthy Liar")
  }

  if(msg.content === "Please measure PP")
  {
    var length = Math.round(Math.random() * 8);
    var len = "=";
    console.log(length)
    for(var i =0; i < length; i ++)
    {
        len = len + '===';
    }
    
      msg.reply("8" + len + ">")
  }



  if (command === 'play') {
    if (msg.channel.type !== 'text') return;

    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel) {
        return msg.reply('please join a voice channel first!');
    }

    voiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=kPkT0jMjEu8', { filter: 'audioonly' });
        const dispatcher = connection.play(stream);

        dispatcher.on('end', () => voiceChannel.leave());
    });
}


})

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.login("NzIwMjA4ODI5OTEyMDU1ODc5.XuCxZg.Oo7waWuJDMC1AyyuEKZk6a1uudc")