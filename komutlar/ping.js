const Discord = require('discord.js');

exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor('Ping Değerim')
  .setColor("#36393F")
  .setDescription(':ping_pong: | Ping' + ` ${client.ping}` + 'ms')
  return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};
