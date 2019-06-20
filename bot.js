const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const tools = require('./functions.js');
const moment = require('moment');
const db = require('quick.db')
const Jimp = require('jimp');
const snekfetch = require('snekfetch');
require('./util/eventLoader')(client);

let owner = "348097494548348940"


const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
      console.log(`az önce panelime birisi tıkladı -_-`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);





const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


let prefix = "vgs!"


client.on("message", message => {
  const dmchannel = client.channels.find("name", "dm");
  if (message.channel.type === "dm") {
      if (message.author.id === client.user.id) return;
      dmchannel.sendMessage("", {embed: {
              color: 3447003,
              title: `DM Atan Kişi: **${message.author.tag}**`,
              description: `Dm Mesajı: **${message.content}**`
            }})
  }
  if (message.channel.bot) return;
});



client.on("ready", () => {
  client.user.setActivity(prefix + "yardım | Güncellemelerden Bot Bazen Çevirim Dışı OlaBilir! ") 
  console.log("Bağlandım!")   
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    if (msg.guild.id == "264445053596991498") return;
    if (msg.guild.id == "478635188079820800") return;
    if (msg.guild.id == "476780574804148224") return;
    if (msg.guild.id == "482861652015054869") return;
        setTimeout(() => {
    }, 1000);//bekle
    msg.react('🇦')
    msg.react('🇸')
            setTimeout(() => {
    }, 1500);
    msg.reply('Aleyküm Selam!');
  }
});




client.on('message', msg => {
  if (msg.content.toLowerCase() === '<@442397076937244672>') {
    if (msg.guild.id == "264445053596991498") return;
        setTimeout(() => {
    }, 1000);//bekle
    msg.react('🇹')
    msg.react('🇲')
            setTimeout(() => {
    }, 1500);
    msg.reply('Botun Prefixi: vgs!');
  }
});




//dene

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
    if (message.author.id === ayarlar.zpeed) permlvl = 4;

  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('message', msg => {
  if (msg.content === 'discord.gg') {
        if (msg.guild.id == "264445053596991498") return;
   msg.delete(30)
    msg.reply('Reklam Engellendi');
  }
});


  

client.on('message', msg => {
  if (msg.content === 'bb') {
    if (msg.guild.id == "264445053596991498") return;
    msg.reply('Görüşmek Üzere :hand_splayed::skin-tone-5:  ');
  }
});


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'tavsiyeni-gönder' || command === 'tavsiye') {
    let str = '<@348097494548348940>';//@silmeyin!
    let id = str.replace(/[<@348097494548348940>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(` ⚠ tavsiyeni yazmayı unuttun. ⚠ `);
    message.channel.sendEmbed(new Discord.RichEmbed()
  .setColor("#36393F")
    .setDescription('Tavsiyeniz Gönderilmiş En Kısa Süre İçinde Sahibim Bakacaktır'));
    const embed = new Discord.RichEmbed()
  .setColor("#36393F")
    .setTitle('Tavsiye bilgileri;')
    .addField('Tavsiye:', mesaj, true)
    .addField('Kullanıcı adı:', message.author.tag, true)
    .addField('Kullanıcı kimliği:', message.author.id, true)
    .addField('Sunucu adı:', message.guild.name, true)
    .addField('Sunucu kimliği:', message.guild.id, true)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});

client.on('guildCreate', guild => {
    let channel = client.channels.get("473534323656753152")
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Giriş ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
         channel.send(embed);
    });
client.on('guildDelete', guild => {
    let channel = client.channels.get("473534323656753152")
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Çıkış ${guild.name}`)
        .setThumbnail(guild.iconURL)
        .addField("Kurucu", guild.owner)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
         channel.send(embed);
    });

	client.on('message', message => {
if (message.content.toLowerCase() === prefix + "espiri") {
    var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Osmanlıda kimseye borç takamıyordun mesela sikke sikke ödüyodun…", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.", "Canım sıkkın kanka sonra gel"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Espri___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});



client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + "sigara") {
  msg.react('🚬');
  msg.react('☁');
msg.channel.send('🚬☁☁☁')
.then(nmsg => nmsg.edit('🚬☁☁☁☁'))
.then(nmsg => nmsg.edit('🚬☁☁☁'))
.then(nmsg => nmsg.edit('🚬☁☁'))
.then(nmsg => nmsg.edit('🚬☁'))
.then(nmsg => nmsg.edit('🚬☁'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
   msg.react('🚬')
  msg.react('☁')
}
});





//hataları sen çözersin artık dene bakım oldumu
client.on('message', message => {
if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın?"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});
  
 
 
 client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
if(command === "discrim") {
        const discrim = args[0] || message.author.discriminator;
        const users = client.users.filter(user => user.discriminator === discrim).map(user => user.tag);
        
        if (users < 1) {
const embed2 = new Discord.RichEmbed()
.setColor(3447003)
.setDescription(`${discrim} bulunamadı!`)
            return message.channel.send({embed2});
        } else {
           message.channel.send(`${users.join('\n')}`, { split: true })
        }
    }
});
 
 
 
 
 client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "ters") {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
        // Start with the character '!'
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send('Ters yazılacak yazıyı yazmalısın.');
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
        )
    }
});
 

client.on('guildCreate', guild => {
  guild.owner.send('Beni Eklediğin İçin Teşekkürler | Komutlarıma vgs!yardım Yazarak Bakabilirsiniz | Discord Sunucuma Gidmek İçin [Tikla!]( https://goo.gl/fJg3z5)%27)')
})







client.on('message', message => {
    if (message.content.toLowerCase() === 'vgs!kedi') {
var request = require('request');

request('http://aws.random.cat/meow', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
  const foto = new Discord.RichEmbed()
  .setImage(info.file)
      message.channel.send(foto)
    }
})
    }
});









client.on('message', message => {
    if (message.content.toLowerCase() === 'köpek') {
var request = require('request');

request('https://random.dog/woof.json', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var info = JSON.parse(body);
  const foto = new Discord.RichEmbed()
  .setImage(info.url)
      message.channel.send(foto)
    }
})
    }
});







client.on('message', async message => {
  if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
  if (error) return console.log('Hata:', error);
  else if (!error) { 
      var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
  if (error) return console.log('Hata:', error); 
  else if (!error) { 
      var euro = JSON.parse(body);

      let doviz = new Discord.RichEmbed()
  .setColor("#36393F")
      .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
      .addField("💎 Döviz", `**💵 Dolar: **${info.buying} TL\n**💶 Euro: **${euro.buying} TL`)
     
      message.channel.send(doviz);
}
})
  }
})
  }
});




client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "vaporwave") {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ[/]^_`ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ{|}~';
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send('Estetik yazılacak yazıyı yazmalısın.');
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .join('')
        )
    }
});











client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${client.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    }
});




const GIFEncoder = require('gifencoder');

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "trigger") {
        const options = {
            size: 256,
          
            frames: 16
        }

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const args = message.content.split(' ').slice(1);
        let member = message.mentions.users.first()
        if (args[0] === undefined) member = message.author;
        let avatarurl = member.avatarURL;
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
        }
        const base = new Jimp(options.size, options.size);
        const avatar = await Jimp.read(avatarurl);
        const text = await Jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410');
        const tint = await Jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373');
        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);
        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;

        stream.on('data', async buffer => await buffers.push(buffer));
        stream.on('end', async () => {
            return await message.channel.send({
                files: [{
                    name: 'notechtriggered.gif',
                    attachment: Buffer.concat(buffers)
                }]
            });
        });
        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();
            if (i === 0) {
                temp.composite(avatar, -16, -16);
            } else {
                temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
            }
            temp.composite(tint, 0, 0);
            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
            encoder.addFrame(frame);
        }
        encoder.finish();
    }
})








client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});








const table = require('table');
const arraySort = require('array-sort');


client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "davetler") {
        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send(`Davetleri görüntülemek için yetkim bulunmuyor.`);
        })
        invites = invites.array();
        arraySort(invites, 'uses', {
            reverse: true
        }); 
        let possibleInvites = [
            ['Kullanıcı', 'Kullanım']
        ]; 
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses]);
        })
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField('Oluşturulma Sıralaması', `\`\`\`${table.table(possibleInvites)}\`\`\``);
        message.channel.send(embed)
    }
});



client.on('message', message => {
  if (message.content.toLowerCase() === prefix + "şans") {
      var sans = ["💎|💳|⌛ - Malesef Kaybettin", "⌛|⌛|💎 - Tüh Be Tekrar Dene", "💳|💎|💳 - Hadi Be Az Kaldı", "💎|💎|💎 - Helal Sana Hepsini Tutturdun", "💎|⌛|⌛ - Az Kaldı Merak Etme", "💳|💳|💳 - Profesyonelsin Dostum", "💎|💳|⌛ - Birdaki Sefere", "⌛|⌛|⌛ - Bu İşte Ustasın Dostum"];
       var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Şans___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});









client.on("message", message => {
  if (message.author.bot) return;
 if (message.content.toLowerCase() === prefix + 'türkkahvesi')
    if (message.author.type !== "group") {
			 message.channel.send('Bağlanılıyor....').then(msg => {
            msg.react("☕").then((msgreaction) => msgreaction.message.edit(kahve))
        });
			message.delete()
      const kahve = new Discord.RichEmbed()
      .setImage("https://goo.gl/36DtWR")
      .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  };
});



    client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ınflames') {
    if (msg.author.id !== ayarlar.sahip) {
        msg.channel.send('Kimliğin doğrulanıyor..')
        .then(nmsg => nmsg.edit('Sen InFlames değilsin.'));
    }else{
    msg.channel.send('InFlames yazılıyor....')
      .then(nmsg => nmsg.edit(':regional_indicator_i:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l: :regional_indicator_a: :regional_indicator_m: :regional_indicator_e:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l: :regional_indicator_a: :regional_indicator_m: :regional_indicator_e:'))
      .then(nmsg => nmsg.edit(':regional_indicator_i: :regional_indicator_n: :regional_indicator_f: :regional_indicator_l: :regional_indicator_a:  :regional_indicator_m: :regional_indicator_e: :regional_indicator_s:'));
  }
  }
});













client.on(`message`, msg => {
  if (msg.content.toLowerCase() === prefix + 'söz') {
    msg.delete();
    var Random = [
      'Herkes kendi kaderinin demircisidir',
      'Belki hiç bir şey yolunda gitmedi ama hiçbir şey de beni yolumdan etmedi!',
      'Gül biraz; bunca keder, bunca gözyaşı dinsin, gül biraz; şu gök kubbe kahkahanı işitsin. Her gidenin ardından koşmaya değmez hayat, gelecekleri bekle, gidecek varsın gitsin.',
      'Aşk davaya benzer, cefa çekmek de şahide. Şahidin yoksa davayı kazanamazsın ki!',
      'İnsan geride bıraktıklarını özler, sahip olduğundan sıkılır, ulaşamadığına tutulur. Genelde ulaşılmaz olan hep aşk olur.',
      'Salatalığın kabuğunu soymak, onun hıyar olduğu gerçeğini değiştirmez.',
      'Bu kadar yürekten çağırma beni. Bir gece ansızın gelebilirim. Beni bekliyorsan, uyumamışsan, sevinçten kapında ölebilirim.',
      'Nankör insan her şeyin fiyatını bilen hiçbir şeyin değerini bilmeyen kimsedir.',
      'Biz birbirimize dönmüş iki ayna gibiyiz. İçimizde binlerce olsa da görüntümüz bir biz sadece birbirimizi görürüz…',
      'Gittiğin yerde boşluk dolduran değil, gittiğin zaman boşluğu doldurulamayan ol.',
      'Eğer aç ve kimsesiz bir köpeği alıp bakar ve rahata kavuşturursanız sizi ısırmaz. İnsan ve köpek arasındaki temel fark budur.',
      'Bir ilişkiyi kadın başlatır, kadın bitirir. Ama başlatan ve bitiren aynı kadın olmayabilir.',
      'Bir tohum verdin çiçeğini al. Bir çekirdek verdin ağacını al. Bir dal verdin ormanını al. Dünyamı verdim sana bende kal.',
      'Yalnızca kültürlü insanlar öğrenmeyi sever cahiller ders vermeyi tercih eder.',
    ];
    var Sözver = Math.floor(Math.random()*Random.length);
    const söz = new Discord.RichEmbed()
    .setDescription(`${Random[Sözver]}`)
    .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
    return msg.channel.sendEmbed(söz);
  }
});




client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'beşiktaş') {
    msg.delete();
    msg.channel.send({embed: {
        color:  0x000000,
        author: {
        },
        description: 'BEŞİKTAŞ :heart: :yellow_heart: :purple_heart:  :blue_heart: :yellow_heart: :purple_heart:',
        footer: {
        }
      }
    });
  }});




client.on('message', msg => {
  if (msg.content.toLowerCase() === 'beşiktaş')
    if (msg.author.type !== "group") {
      const beşiktaş = new Discord.RichEmbed()
      .setImage("https://goo.gl/KRfm45")
      .setColor("#36393F");
      return msg.channel.sendEmbed(beşiktaş);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'fenerbahçe')
    if (msg.author.type !== "group") {
      const fenerbahçe = new Discord.RichEmbed()
      .setImage("https://goo.gl/uX2Sqa")
      .setColor("#36393F");
      return msg.channel.sendEmbed(fenerbahçe);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'galatasaray')
    if (msg.author.type !== "group") {
      const galatasaray = new Discord.RichEmbed()
      .setImage("https://goo.gl/7TLZ8H")
      .setColor("#36393F");
      return msg.channel.sendEmbed(galatasaray);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '41kocaeli')
    if (msg.author.type !== "group") {
      const kocaelispor = new Discord.RichEmbed()
      .setImage("https://goo.gl/iXizxf")
      .setColor("#36393F");
      return msg.channel.sendEmbed(kocaelispor);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'trabzonspor')
    if (msg.author.type !== "group") {
      const trabzon = new Discord.RichEmbed()
      .setImage("https://goo.gl/q9AFbP")
      .setColor("#36393F");
      return msg.channel.sendEmbed(trabzon);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'başakşehir')
    if (msg.author.type !== "group") {
      const başakşehir = new Discord.RichEmbed()
      .setImage("https://goo.gl/3hC3wu")
      .setColor("#36393F");
      return msg.channel.sendEmbed(başakşehir);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bursaspor')
    if (msg.author.type !== "group") {
      const bursaspor = new Discord.RichEmbed()
      .setImage("https://goo.gl/j5GC5E")
      .setColor("#36393F");
      return msg.channel.sendEmbed(bursaspor);
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'karsspor')
    if (msg.author.type !== "group") {
      const karsspor = new Discord.RichEmbed()
      .setImage("https://cdn.discordapp.com/attachments/415626545538007073/442456119957389322/kars.jpg")
      .setColor("#36393F");
      return msg.channel.sendEmbed(karsspor);
  }
});



















client.on('message', msg => {
      if (msg.content.toLowerCase() === 'vgs!onayla') {
        msg.reply('Kendini Doğrulatmak İstiyorsan Şunu Yaz vgs!botdeğilim');
      }
    });

    client.on('message', msg => {
      if (msg.content.toLowerCase() === 'vgs!botdeğilim') {
        msg.reply('Adlı Kullanıcı Bot Olmadığını Onayladı!!!');
msg.channel.send('Başarıyla Bot Olamdığın Onaylandı')
      }
    });






client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'adamsın') {
    await msg.react('🇦');
    await msg.react('🇩');
    await msg.react('🅰');
    await msg.react('🇲');
  }
});
       



client.on('message', message => {
  if (message.content.toLowerCase() === prefix + 'hacker') {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;
        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));
        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468848900829085716/neblm.png", (err, avatar) => {
                avatar.resize(295, 295)
                              image.composite(avatar, 2, 0).write(`./img/hemckır/${client.user.id}-${user.id}.png`);

                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/hemckır/${client.user.id}-${user.id}.png`));
                }, 1000);
            });
        });
  }
});
                
client.on('message', message => {
    if (message.content.toLowerCase() === prefix + 'oç') {
      
                
                var user = message.mentions.users.first() || message.author;

        if (!message.guild) user = message.author;
                      message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(3000));
                Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            Jimp.read("https://cdn.discordapp.com/attachments/468845638688440323/468881255912570890/ANAN.png", (err, avatar) => {
                avatar.resize(295, 295)
                                            image.composite(avatar, 2, 0).write(`./img/oç/${client.user.id}-${user.id}.png`);

                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/oç/${client.user.id}-${user.id}.png`));
                              }, 1000);

            });
                });
    }
});
        
                  
    
client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor(ayarlar.renk)
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})

// Sunucuya birisi girdiği zaman mesajı yolluyalım

client.on("guildMemberAdd", async member => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    const channel = member.guild.channels.find("name", "log")
    channel.send(`**📥 ${member.user.tag}** Katıldı ${sayac[member.guild.id].sayi} olmamıza son ${sayac[member.guild.id].sayi - member.guild.members.size} üye kaldı!`)
})

client.on("guildMemberRemove", async member => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    const channel = member.guild.channels.find("name", "log")
    channel.send(`**📤 ${member.user.tag}** Ayrıldı ${sayac[member.guild.id].sayi} olmamıza son ${sayac[member.guild.id].sayi - member.guild.members.size} üye kaldı!`)
})

client.on("message", async message => {
  if(message.author.bot) return;
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
  if(message.content.indexOf(prefix) !== 0) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];


  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args)

})
  
client.on("message", async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    if (command === "mod-log-ayarla" || command === "modlogayarla" || command === "mod-logayarla" || command === "modlog") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
            return message.channel.send("Geçerli bir kanal etiketlemelisin.\nDoğru kullanım: ${prefix}mod-log-ayarla [#kanal]")
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`membermodChannel_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`${process.env.basarili} Mod-Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`${process.env.basarili} Mod-Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }
});


client.on('messageUpdate', async (oldMessage, newMessage) => {
      if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;
  let embedds4 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Mesaj Güncellendi!`)
        .setThumbnail(oldMessage.author.avatarURL)
        .addField("Gönderen", oldMessage.author.tag, true)
        .addField("Önceki Mesaj", oldMessage.content, true)
        .addField("Şimdiki Mesaj", newMessage.content, true)
        .addField("Kanal", newMessage.channel.name, true)
    let membermodChannel = await db.fetch(`membermodChannel_${oldMessage.guild.id}`)
    if (!oldMessage.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else oldMessage.guild.channels.get(membermodChannel).send(embedds4)
})

client.on('channelDelete', async channel => {
  let embedds3 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Kanal Silindi!`)
        .setThumbnail(channel.guild.iconURL)
        .setDescription(`'${channel.name}' adlı kanal silindi!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embedds3)
})

client.on('channelCreate', async channel => {
  let embedds2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Kanal Oluşturuldu!`)
        .setThumbnail(channel.guild.iconURL)
        .setDescription(`'${channel.name}' adlı kanal oluşturuldu!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${channel.guild.id}`)
    if (!channel.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else channel.guild.channels.get(membermodChannel).send(embedds2)
})

client.on('emojiCreate', async emoji => {
  let embedds9 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Oluşturuldu!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`<:${emoji.name}:${emoji.id}> - ${emoji.name} adlı emoji oluşturuldu!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else emoji.guild.channels.get(membermodChannel).send(embedds9)
})

client.on('emojiDelete', async emoji => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Emoji Silindi!`)
        .setThumbnail(emoji.guild.iconURL)
        .setDescription(`':${emoji.name}:' adlı emoji silindi!`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${emoji.guild.id}`)
    if (!emoji.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else emoji.guild.channels.get(membermodChannel).send(embedds0)
})

client.on('roleCreate', async role => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rol Oluşturuldu!`)
        .setThumbnail(role.guild.iconURL)
        .setDescription(`'${role.name}' adlı rol oluşturuldu.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else role.guild.channels.get(membermodChannel).send(embedds0)
})

client.on('roleDelete', async role => {
  let embedds0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rol Silindi!`)
        .setThumbnail(role.guild.iconURL)
        .setDescription(`'${role.name}' adlı rol silindi.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${role.guild.id}`)
    if (!role.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else role.guild.channels.get(membermodChannel).send(embedds0)
})

client.on('messageDelete', async message => {
      if (message.author.bot) {
        return false;
    }

    if (!message.guild) {
        return false;
    }

  let embedds7 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Mesaj Silindi!`)
        .setThumbnail(message.author.avatarURL)
        .addField("Gönderen", message.author.tag, true)
        .addField("Mesaj", message.content, true)
        .addField("Kanal", message.channel.name, true)
    let membermodChannel = await db.fetch(`membermodChannel_${message.guild.id}`)
    if (!message.guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else message.guild.channels.get(membermodChannel).send(embedds7)
})

client.on('guildBanRemove', async (guild, member) => {
  let embedds6 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Yasak Kaldırıldı!`)
        .setThumbnail(member.avatarURL)
        .setDescription(`'${member.tag}' adlı kişinin yasağı kaldırıldı.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embedds6)
})

client.on('guildBanAdd', async (guild, member) => {
  let embedds5 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Üye Yasaklandı!`)
        .setThumbnail(member.avatarURL)
        .setDescription(`'${member.tag}' adlı kişi sunucudan yasaklandı.`, true)
    let membermodChannel = await db.fetch(`membermodChannel_${guild.id}`)
    if (!guild.channels.get(membermodChannel)) return console.log('membermodChannel')
    else guild.channels.get(membermodChannel).send(embedds5)
})


client.on("message", async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
if (command === "log-ayarla" || command === "logayarla") {
        if (!message.member.hasPermission("MANAGE_GUILD"))
if(isNaN(args[0])) {
        const embed = new Discord.RichEmbed()
            .setDescription(`Lütfen bir sayı yazın!`)
  .setColor("#36393F")
            .setTimestamp()
        message.channel.send({embed})
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!message.mentions.channels.first() && args.join(" ").toLowerCase() === `none`)
            return message.channel.send("Geçerli bir kanal etiketlemelisin.\nDoğru kullanım: ${prefix}log-ayarla [#kanal]")
        let newChannel;
        if (args.join(" ").toLowerCase() === `none`) newChannel = '';
        else newChannel = message.mentions.channels.first().id;
        db.set(`memberChannel_${message.guild.id}`, newChannel).then(i => {
            const ayarlar2 = new Discord.RichEmbed().setFooter(`${process.env.basarili} Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
            return message.channel.send(`${process.env.basarili} Log kanalı ${message.mentions.channels.first()} olarak seçilmiştir.`)
        })
    }
}
});


client.on("guildMemberAdd", async member => {
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
		let username = member.user.username;
		if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
		if (member.guild.channels.get(memberChannel).type === "text") {
			const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/473591102172168192/guildAdd.png");
			const userimg = await Jimp.read(member.user.avatarURL);
			var font;
			if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
			else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
			else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
			await bg.print(font, 430, 170, member.user.tag);
			await userimg.resize(362, 362);
			await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
			  setTimeout(function () {
					member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
			  }, 1000);
			  setTimeout(function () {
				fs.unlink("./img/" + member.id + ".png");
			  }, 10000);
		}
	})

  client.on("guildMemberRemove", async member => {
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
		let username = member.user.username;
		if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
		if (member.guild.channels.get(memberChannel).type === "text") {
			const bg = await Jimp.read("https://cdn.discordapp.com/attachments/458732340491845633/473591115526701056/guildRemove.png");
			const userimg = await Jimp.read(member.user.avatarURL);
			var font;
			if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
			else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
			else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
			await bg.print(font, 430, 170, member.user.tag);
			await userimg.resize(362, 362);
			await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
			  setTimeout(function () {
					member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
			  }, 1000);
			  setTimeout(function () {
				fs.unlink("./img/" + member.id + ".png");
			  }, 10000);	
    }
  
  })


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'özelkomut' || command === 'özel-komut') {
    let str = '<@348097494548348940>';//@silmeyin!
    let id = str.replace(/[<@!>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(` ⚠ Özel Komut Eklemek İçin !!özel-komut komutun Olucak Şekilde Atabilirsin ⚠ `);
    message.channel.sendEmbed(new Discord.RichEmbed()
      .setColor("#36393F")
    .setDescription('\✅|Özel Komutun Başarıyla Ayarlandı!!!'));
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Özel Komut Ekleme;')
    .addField('Özel Komut:', mesaj, true)
    .addField('Eklemek İsteyen:', message.author.tag, true)
    .addField('Kullanıcı kimliği:', message.author.id, true)
    .addField('Sunucu adı:', message.guild.name, true)
    .addField('Sunucu kimliği:', message.guild.id, true)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});

//Otorol Yeri



//Otorol Yeri




client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

    if (command === "panel") {
        let memberIDFetched = await db.fetch(`memberChannel_${message.guild.id}`);
        if (memberIDFetched == null) memberIDFetched = 'Belirlenmemiş'
        let memberIDFetched2 = await db.fetch(`membermodChannel_${message.guild.id}`);
        if (memberIDFetched2 == null) memberIDFetched2 = 'Belirlenmemiş'
        let prefixFetched = await db.fetch(`prefix_${message.guild.id}`);
        if (prefixFetched == null) prefixFetched = 'vgs!'
        let autoRoleFetched = await db.fetch(`autoRole_${message.guild.id}`);
        if (autoRoleFetched == null) autoRoleFetched = 'Belirlenmemiş'
        let prefüx = await db.fetch(`prefix_${message.guild.id}`);
        if (!prefüx) prefüx = "vgs!"
        const ayarlar = new Discord.RichEmbed().setTitle("Sunucu Paneli").setDescription(`**Prefix:** ${prefixFetched}\n**Log:** <#${memberIDFetched}> \n**Mod-Log:** <#${memberIDFetched2}>\n**Oto rol:** ${autoRoleFetched}`).setFooter(`Yardım almak için ${prefüx}panelyardım`).setThumbnail(message.guild.iconURL)
        message.channel.send(ayarlar)
    }
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);
if (command === "prefix" || command === "prefix-ayarla") {
        const embed1 = new Discord.RichEmbed().setFooter("Uyarı: Üzgünüm bu komutu kullanabilecek yetkin yok.").setColor(0xc25b5b)
        const embed2 = new Discord.RichEmbed().setFooter(`Uyarı: Geçerli bir prefix girmelisin.\nDoğru kullanım: ${prefix}prefix [Yeni prefix]`).setColor(0xc25b5b)
        if (!message.member.hasPermission("MANAGE_GUILD"))
            return message.channel.send(`${process.env.basarisiz} Bu komutu kullanmak için yetkin bulunmuyor.`)
        if (!args[0])
            return message.channel.send(`${process.env.basarisiz} Prefix girmelisiniz.`)
        db.set(`prefix_${message.guild.id}`, args.join('  ')).then(ü => {
            message.channel.send(`${process.env.basarili} Prefix ${ü} olarak seçilmiştir.`)
        })
    }
});



client.login(process.env.TOKEN);