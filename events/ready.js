const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const snekfetch = require('snekfetch');
const api = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0MjM5NzA3NjkzNzI0NDY3MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTM2MjI1MTY5fQ.phYqN2qRV5T_Ii4btb-TFUKKVIl4-7oHJqY3bEV2yY8';

var prefix = ayarlar.prefix;

module.exports = client => {
    snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
  .set('Authorization', api)
  .send({ server_count: client.guilds.size })
  .then(() => console.log('Updated discordbots.org stats.'))
console.log('>>Oynuyor kısmı başarıyla güncellendi.');
console.log('Bot hazır ve giriş yaptı.');
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);

    var Games = [

        "uf!yapımcım 》 [JTm] BullTerrier#1936 《 Yapımcımız",
        "Bot Davet Linki 》 uf!davet 《",
        "》 Yep Yeni Komutlar 《",
        "》 Uncle FreeRoam Sunucusu Olarak Sizlere Hizmet Vermekteyiz. 《",


        `${prefix}yardım | ${client.guilds.size} sunucu | Yeni Komutlar Kodlanıyor`


    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(Games.length-0+1)+0);

client.user.setActivity(Games[random], { type: "STREAMING", url: "https://www.twitch.tv/tugrabot" } );
        }, 2 * 2500);

};