// Prefixmizi Sıfırlayalım.


const Discord = require("discord.js");
const db = require('quick.db');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu Komutu kullanmanız için `Sunucu_Yönet` Yetkisine sahip olmalısınız.")

  db.delete(`prefix_${message.guild.id}`)
    message.channel.send(`Prefix Sıfırlandı. Yeni Prefix ayarlamak için vgs!prefix (prefix) şeklinde ayarlaya bilirsiniz.`)
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["önek-sıfırla", "ön-ek-sıfırla"],
  permLevel: 0
};

exports.help = {
  name: 'prefix-sıfırla',
  description: '',
  usage: ''
};

// Komut kullanınca varsayılan prefixle başlamasını sağlayalım


client.on("message", async message => {
  if(message.author.bot) return;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || 'vgs!'
  if(message.content.indexOf(prefix) !== 0) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];


  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args)

})

