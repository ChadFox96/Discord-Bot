
const Discord = require("discord.js")
const fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const axios = require('axios');
const champions = require('lol-champions');
const { getPost, getImage } = require('random-reddit')
const items = require('lol-items/items');
// const items = require('lol-items');

let options = {
    imageOnly: true,
    allowNSFW: true
};

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

    //get the rest of the arry besides the comma
    const args = split.slice(1);

    console.log(split);
    if(command === "help")
    {
        msg.channel.send("Try typing '?info', '?memeinfo', '?porninfo'")
    }
    if (command === 'info') {
        msg.channel.send("INFO\n-------------\n?chuck - Chuck Norris Quote \n?ron - Ron Swanson Quotes\n?avatar - Get avatar of people\n?measurePP - Measures PP size\n?reddit + subreddit name - get random image\n?roast me  - Get roasted\n?champ - returns random league champ\n?item - returns random league item");             
    }
    if(command === 'memeinfo')
    {
        msg.channel.send("The dankest memes\n-------------\n?dankmemes - returns image from r/dankmemes\n?leagueMemes - league memes\n?memes - generic memes");             
    }
    if (command === 'porninfo') {
        msg.channel.send("You sick freak\n-------------\n?collegesluts \n?bigtiddygothgf\n?hotchickswithtattoos\n?bodyperfection\n?booty\n?pornhubcomments\n?curvy\n?pawg");             
    }

    if (command === 'dankmemes') {
        getImage("dankmemes", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setDescription(`dankest of memes`)
                .setImage(image)
            msg.channel.send(ballembed);
            // msg.channel.send({files : [image]});
        })
    }
    if (command === 'memes') {
        getImage("memes", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setDescription(`dankest of memes`)
                .setImage(image)
            msg.channel.send(ballembed);
            // msg.channel.send({files : [image]});
        })
    }
    if (command === 'leaguememes') {
        getImage("leagueofmemes", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setDescription(`dankest of league memes`)
                .setImage(image)
            msg.channel.send(ballembed);
            // msg.channel.send({files : [image]});
        })
    }
    if (command === 'collegesluts') {
        getImage("collegesluts", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'bigtiddygothgf') {
        getImage("bigtiddygothgf", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'hotchickswithtattoos') {
        getImage("hotchickswithtattoos", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'bodyperfection') {
        getImage("bodyperfection", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'booty') {
        getImage("booty", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'curvy') {
        getImage("curvy", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'pawg') {
        getImage("pawg", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'pornhubcomments') {
        getImage("pornhubcomments", options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
        })
    }
    if (command === 'reddit') {     
        getImage(args[0], options).then(image => {
            let ballembed = new Discord.MessageEmbed()
                .setImage(image)
            msg.channel.send(ballembed);
            // msg.channel.send({files : [image]});
        })
    }
    if (command === 'ron') {
        axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
            .then(function (response) {
                msg.channel.send(response.data[0]);
            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })
    }
    if (command === 'chuck') {
        axios.get('https://api.chucknorris.io/jokes/random')
            .then(function (response) {
                msg.channel.send(response.data.value);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    if (command === 'avatar') {
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
    if (command === "measurePP") {
        var length = Math.round(Math.random() * 8);
        var len = "=";
        for (var i = 0; i < length; i++) {
            len = len + '===';
        }
        msg.reply("8" + len + ">")
    }
    if (command === 'roast') {
        const roasts = require('./roasts').roasts;
        if (args[0] === 'me') {
            var length = Math.round(Math.random() * 136);
            msg.channel.send(roasts[length].roast);
        }
        else if (args[0]) {
            const user = getUserFromMention(args[0]);
            if (!user) {
                return msg.reply('Please use a proper mention if you want to roast someone.');
            }
            else if (user.username === 'Rise of Anarchy') {
                msg.channel.send("I cannot roast the almighty big PP man")
            }
            else {
                var length = Math.round(Math.random() * 136);
                msg.channel.send(`${user}` + roasts[length].roast);
            }
        }
    }
   

    if (command === 'pistol') {
        var length = Math.round(Math.random() * 5);
        msg.channel.send(pistols[length])
    }

    if (command === 'gun') {
        var length = Math.round(Math.random() * guns.length);
        msg.channel.send(guns[length])
    }
    if (command === 'grenade') {
        var length = Math.round(Math.random() * grenandes.length);
        msg.channel.send(grenandes[length])
    }

    if (command === 'kit') {
        var length = Math.round(Math.random() * 5);
        var length2 = Math.round(Math.random() * grenandes.length);
        var length3 = Math.round(Math.random() * guns.length);
        var length4 = Math.round(Math.random() * grenandes.length);       

        if (length == 0) {
            msg.channel.send("No Armour, Gun:  " + guns[length3] + ", Util: " + grenandes[length4] + ", " + grenandes[length2])
        }
        else if (length == 1 || length == 2) {
            msg.channel.send("Just Kevlar, Gun:  " + guns[length3] + ", Util: " + grenandes[length4] + ", " + grenandes[length2])
        }
        else {
            msg.channel.send("Full Armour, Gun:  " + guns[length3] + ", Util: " + grenandes[length4] + ", " + grenandes[length2])
        }
    }

    if (command === 'champ') {
        var length = Math.round(Math.random() * champions.length);
        console.log(champions[length]);
        msg.channel.send(champions[length].name + "  " + champions[length].title)
    }

    if(command === 'item')
    {
         var length = Math.round(Math.random() * items.length);
        msg.channel.send(items[length].name)        
    }
    if(command === 'items')
    {   
        for(let i =0;i<6;i++)
        {
         var length = Math.round(Math.random() * items.length);
         msg.channel.send(items[length].name);        
        }
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

client.login("NzIwMjA4ODI5OTEyMDU1ODc5.XuYyzQ.NMrG4Iv1j48Ir30m5hVANcJ-Xzk")
const pistols = ["USP/P2000", "p250", "5-7", "CZ75-Auto", "Dual Pistols", 'DEAGLE'];
const guns = ["Famas", "M4/AK", "AUG", "Noob Cannon", "SSG", 'AWP', "MP9", "PP", "MP7", "UMP-45", "P90", 'Mag-7', "XM1014", "Nova 4 Skin", "M249", 'Negev - Hamish Special', 'Zeus', 'knife only'];
const grenandes = ["smoke", "flash", "decoy", "Molly", "Grenade", 'Nothing'];
