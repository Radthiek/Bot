const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("**Sunucu İstatistikler**\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .addField('Server 1 \n🔵 \nServer 2 \n⚪ \nServer 3 \n🔵 \nServer 4 \n🔵 \nServer 5 \n🔵 \nServer 6 \n⚪ \nServer 7 \n🔵 \nServer 8 \n⚪ \nServer 9 \n🔴 \nServer 10 \n⚪ \n---------------------- \n🔵 - İyi / 🔴 - Kötü / ⚫ - Çalışmıyor / ⚪ - Boş')
  .setThumbnail('https://zalarieunique.ru/images/crystal-clipart-ice-shard-9.png')
    .setURL('')
  .setColor("#36393F")
  message.delete();
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['swi', 'durum', 'stats'],
  permLevel: 0
};

exports.help = {
  name: 'serveristatistik',
  description: '',
  usage: 'serveristatistik'
};