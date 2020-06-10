
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
    //split up message into array divided by spaces
    const split = withoutPrefix.split(/ +/);
    
    //get part after ?. e.g. ?play
    const command = split[0];
    
    //get the rest of the arry besides the comman
    const args = split.slice(1);

    console.log(split);
    

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

client.login("NzIwMjA4ODI5OTEyMDU1ODc5.XuDWAg.b9CQaPRNkosFeA1cDs-7PpCHvMU")