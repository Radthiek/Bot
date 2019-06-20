
const Discord = require("discord.js");
const db = require('quick.db');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu Komutu kullanmanız için `Sunucu_Yönet` Yetkisine sahip olmalısınız.")
  let arg = args[0]
  if(!arg) return message.channel.send("Lütfen ayarlamak istediğiniz bir ön-ek girin!")

  db.set(`prefix_${message.guild.id}`, args.join(' ')).then(i => {
    message.channel.send(`👌 Ön-ek \`${i}\` olarak ayarlandı`)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["önek", "ön-ek"],
  permLevel: 0
};

exports.help = {
  name: 'prefix',
  description: '',
  usage: ''
};

// Komut kullanınca ayarlanan prefixle başlamasını sağlayalım


