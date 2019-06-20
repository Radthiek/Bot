const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let question = message.content.split(' ').slice(1).join(' ');
    /*
    List of answers that the bot can randomize
    */
    const answers = [
        'Evet',
        'Tabiki',
        'Hayır',
        'Belki',
        'Kesinlikle Hayır',
        'İmkansız'
    ];
    /*
    If author didn't ask a question return
    */
    if (!question) {
        return message.reply('Kullanımı f!sor Nasılsın');
    }
    const embed = new Discord.RichEmbed()
  .setAuthor(`Sor`, 'https://cdn.pixabay.com/photo/2014/08/21/19/43/question-423604_960_720.png')
  .addField('Bilgi:', `**Soru:** ${args}\n**Cevap:** ${answers[~~(Math.random() * answers.length)]}`);
    message.channel.send({embed}).catch(e => (e))
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };  
  exports.help = {
    name: 'sor',
    description: 'Bota soru sorarsınız.',
    usage: 'sor'
  };
 