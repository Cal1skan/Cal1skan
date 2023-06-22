const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.'; // Komutların başına gelecek prefix

client.once('ready', () => {
    console.log('Bot çalışıyor.');
});

 // Rol Al
client.on('message', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'rolal') {
      if (!message.mentions.users.size) {
        return message.reply('Lütfen bir kişi etiketleyin.');
      }
  
      const member = message.guild.member(message.mentions.users.first());
      if (!member) {
        return message.reply('Geçerli bir üye etiketleyin.');
      }
  
      const roles = member.roles.cache.filter((role) => role.name !== 'Üye');
  
      try {
        member.roles.remove(roles).then(() => {
          const memberRole = message.guild.roles.cache.find((role) => role.name === 'Member');
          member.roles.add(memberRole);
          message.reply('Kişinin tüm rolleri alındı, sadece "Member" rolü bırakıldı.');
        });
      } catch (error) {
        console.error('Rol alma hatası:', error);
        message.reply('Rol alma işlemi sırasında bir hata oluştu.');
      }
    }
  
    // Diğer komutlar buraya eklenecek
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'big') {
      if (!message.mentions.users.size) {
        return message.reply('Lütfen bir kişi etiketleyin.');
      }
  
      const member = message.guild.member(message.mentions.users.first());
      if (!member) {
        return message.reply('Geçerli bir üye etiketleyin.');
      }
  
      const bigBossRole = message.guild.roles.cache.find((role) => role.name === 'BIG BOSS');
      if (!bigBossRole) {
        return message.reply('Sunucuda "bigbos" rolü bulunamadı.');
      }
  
      try {
        member.roles.add(bigBossRole);
        message.reply('Etiketlenen kişiye "bigbos" rolü verildi.');
      } catch (error) {
        console.error('Rol verme hatası:', error);
        message.reply('Rol verme işlemi sırasında bir hata oluştu.');
      }
    }
  
    // Diğer komutlar buraya eklenecek
  });

  client.on('message', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'davet') {
      message.guild.fetchInvites()
        .then((invites) => {
          const existingInvites = invites.array();
          const invite = existingInvites.find((invite) => invite.inviter.id === message.guild.ownerID);
  
          if (invite) {
            message.channel.send(`Sunucu Davet Linki: ${invite.url}`);
          } else {
            message.channel.createInvite()
              .then((newInvite) => {
                message.channel.send(`Sunucu Davet Linki: ${newInvite.url}`);
              })
              .catch((error) => {
                console.error('Davet linki oluşturma hatası:', error);
                message.reply('Davet linki oluşturulurken bir hata oluştu.');
              });
          }
        })
        .catch((error) => {
          console.error('Davetleri alma hatası:', error);
          message.reply('Sunucunun davet linki alınırken bir hata oluştu.');
        });
    }
  
    // Diğer komutlar buraya eklenecek
  });

 // Mesaj Yanıtlama
client.on('message', message => {
    const content = message.content.toLowerCase();

    if (content === 'söv') {
        message.channel.send('Ananın Amını Parçalar Deler Deler Döndürür Götüne Sokar Sikerim Piç Kurusu Siktir Git Amcık Kafalı Piç Kurusu Ananın Kıllı Amıcğı Patlatırım Orospu Çocuğu Gapçık Kafalı Rahatsız Etmeyin Lan Beni. Cal1skan SAPLARR!!!!');
    }

    if (content === 'kodlar') {
        message.channel.send('söv ban at sustur çek sesat rolal big yetkili web ');
    }
});

 // Rol Veren Otomatik
client.on('guildMemberAdd', member => {
    const roleId = '1115581015159734372'; // İd'si girilen rolün ID'si
    member.roles.add(roleId);
});

 // hoşgeldin Mesajı
client.on('guildMemberAdd', member => {
    const channelID = '1115372248224780333'; // Kayıt kanalının ID'sini buraya girin
    const welcomeMessage = `Hoşgeldin ${member}, sunucumuza katıldığın için teşekkürler!`; // Hoşgeldin mesajı
  
    const channel = member.guild.channels.cache.get(channelID);
    if (channel) {
      channel.send(welcomeMessage);
    } else {
      console.log('Belirtilen kanal bulunamadı!');
    }
  });
  

 // hoşgeldin Mesajı Banla  At
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();



    if (command === 'ban') {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const targetUser = message.mentions.users.first();
        if (targetUser) {
            const targetMember = message.guild.member(targetUser);
            if (targetMember) {
                targetMember.ban()
                    .then(() => message.reply(`Başarıyla ${targetUser.tag} kullanıcısını banladım!`))
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcı banlanamadı.');
                    });
            } else {
                message.reply('Etiketlenen kullanıcı sunucuda bulunmuyor!');
            }
        } else {
            message.reply('Banlamak istediğiniz kullanıcıyı etiketleyin!');
        }
    }

    else if (command === 'unban') {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const targetId = args[0];
        if (!targetId) {
            return message.reply('Banını kaldırmak istediğiniz kullanıcının ID\'sini belirtin!');
        }

        message.guild.fetchBan(targetId)
            .then(ban => {
                message.guild.members.unban(ban.user)
                    .then(() => message.reply(`Başarıyla ${ban.user.tag} kullanıcısının banını kaldırdım!`))
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcının banı kaldırılamadı.');
                    });
            })
            .catch(() => {
                message.reply('Belirttiğiniz ID\'ye sahip bir ban bulunamadı!');
            });
    }

    else if (command === 'at') {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const targetUser = message.mentions.users.first();
        if (targetUser) {
            const targetMember = message.guild.member(targetUser);
            if (targetMember) {
                targetMember.kick()
                    .then(() => message.reply(`Başarıyla ${targetUser.tag} kullanıcısını sunucudan attım!`))
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcı atılamadı.');
                    });
            } else {
                message.reply('Etiketlenen kullanıcı sunucuda bulunmuyor!');
            }
        } else {
            message.reply('Atmak istediğiniz kullanıcıyı etiketleyin!');
        }
    }

    else if (command === 'sustur') {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const targetUser = message.mentions.members.first();
        if (targetUser) {
            const muteRole = message.guild.roles.cache.find(role => role.name === '🔇Muted'); // Susturulmuş rolünün adı

            if (!muteRole) {
                return message.reply('Susturulmuş rolü bulunamadı!');
            }

            const muteTime = parseInt(args[0]); // Susturma süresi (saniye cinsinden)

            if (isNaN(muteTime) || muteTime <= 0) {
                return message.reply('Lütfen geçerli bir susturma süresi belirtin!');
            }

            targetUser.roles.add(muteRole)
                .then(() => {
                    message.channel.send(`${targetUser} kullanıcısı ${muteTime} saniye boyunca susturuldu.`);

                    setTimeout(() => {
                        targetUser.roles.remove(muteRole)
                            .then(() => {
                                message.channel.send(`${targetUser} kullanıcısının susturması kaldırıldı.`);
                            })
                            .catch(error => {
                                console.error(error);
                                message.reply('Bir hata oluştu ve kullanıcının susturması kaldırılamadı.');
                            });
                    }, muteTime * 1000); // Susturma süresini milisaniye cinsinden ayarlayın
                })
                .catch(error => {
                    console.error(error);
                    message.reply('Bir hata oluştu ve kullanıcı susturulamadı.');
                });
        } else {
            message.reply('Susturulacak kullanıcıyı etiketleyin!');
        }
    }

    else if (command === 'oylama') {
        const question = 'Sunucu hoşunuza gitti mi?'; // Oylama sorusu
        const everyoneRole = message.guild.roles.everyone; // @everyone rolü

        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Oylama')
            .setDescription(question)
            .setFooter('Oylamaya katılmak için tepki verin.');

        message.channel.send(everyoneRole.toString(), { embed })
            .then(sentMessage => {
                sentMessage.react('✅'); // Tik emojisi
                sentMessage.react('❌'); // Çarpı emojisi
            })
            .catch(error => {
                console.error(error);
                message.reply('Oylama mesajı gönderilemedi.');
            });
    }

    else if (command === 'oy') {
        const question = 'Sunucuda Gözünüze Batan Bir Şey Bulunmaktamıdır? (Evet İse Öneriler Kısmına Yazarsanız Memnun Kalırım Namı Değmez Cal1skan V2)'; // Oylama sorusu
        const everyoneRole = message.guild.roles.everyone; // @everyone rolü

        const embed = new Discord.MessageEmbed()
            .setColor('#00ffff')
            .setTitle('Oylama')
            .setDescription(question)
            .setFooter('Oylamaya katılmak için tepki verin.');

        message.channel.send(everyoneRole.toString(), { embed })
            .then(sentMessage => {
                sentMessage.react('✅'); // Tik emojisi
                sentMessage.react('❌'); // Çarpı emojisi
            })
            .catch(error => {
                console.error(error);
                message.reply('Oylama mesajı gönderilemedi.');
            });
    }


    else if (command === 'çek') {
        const targetUser = message.mentions.members.first();
        if (targetUser && targetUser.voice.channel) {
            targetUser.voice.setChannel(message.member.voice.channel);
        } else {
            message.reply('Etiketlenen kişi seste değil!');
        }
    }

    else if (command === 'sil') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }
    
        const amount = parseInt(args[0]);
    
        if (isNaN(amount) || amount <= 0 || amount > 100) {
            return message.reply('Lütfen 1-100 arasında geçerli bir mesaj sayısı belirtin!');
        }
    
        message.channel.bulkDelete(amount + 1)
            .then(deletedMessages => {
                message.channel.send(`${deletedMessages.size - 1} adet mesaj silindi!`)
                    .then(msg => {
                        msg.delete({ timeout: 3000 });
                    });
            })
            .catch(error => {
                console.error(error);
                message.reply('Bir hata oluştu ve mesajlar silinemedi.');
            });
    }

    
    else if (command === 'sesat') {
        if (!message.member.hasPermission('MOVE_MEMBERS')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }
    
        const targetUser = message.mentions.members.first();
        if (targetUser && targetUser.voice.channel) {
            targetUser.voice.kick()
                .then(() => message.reply(`Başarıyla ${targetUser.user.tag} kullanıcısını sesten çıkardım!`))
                .catch(error => {
                    console.error(error);
                    message.reply('Bir hata oluştu ve kullanıcı sesten çıkarılamadı.');
                });
        } else {
            message.reply('Etiketlenen kullanıcı seste değil!');
        }
    }
    
    else if (command === 'web') {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

    const targetUser = message.mentions.users.first();
    if (targetUser) {
            const targetMember = message.guild.member(targetUser);
            if (targetMember) {
                const yetkiRoleId = '1116238493555900476'; // Web rolünün ID'si
                const MemberRoleId = '1115372247889223706'; //Member Id
                const kayitsizRoleId = '1115581015159734372'; // Kayıtsız rolünün ID'si

                targetMember.roles.add(yetkiRoleId)
                    .then(() => {
                        targetMember.roles.remove(kayitsizRoleId)
                            .then(() => {
                                message.reply(`${targetUser} kullanıcısına yetki rolü verildi!`);
                            })
                            .catch(error => {
                                console.error(error);
                                message.reply('Bir hata oluştu ve kullanıcıdan kayıtsız rolü alınamadı.');
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcıya yetki rolü verilemedi.');
                    });
                    targetMember.roles.add(MemberRoleId)
                    .then(() => {
                        targetMember.roles.remove(kayitsizRoleId)
                            .catch(error => {
                                console.error(error);
                                message.reply('Bir hata oluştu ve kullanıcıdan kayıtsız rolü alınamadı.');
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcıya yetki rolü verilemedi.');
                    });
            } else {
                message.reply('Etiketlenen kullanıcı sunucuda bulunmuyor!');
            }
        } else {
            message.reply('Kullanıcıyı etiketleyin!');
        }
    }

    else if (command === 'yetkili') {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

    const targetUser = message.mentions.users.first();
    if (targetUser) {
            const targetMember = message.guild.member(targetUser);
            if (targetMember) {
                const yetkiRoleId = '1115372247918583890'; // Yetki rolünün ID'si
                const kayitsizRoleId = '1115581015159734372'; // Kayıtsız rolünün ID'si

                targetMember.roles.add(yetkiRoleId)
                    .then(() => {
                        targetMember.roles.remove(kayitsizRoleId)
                            .then(() => {
                                message.reply(`${targetUser} kullanıcısına yetki rolü verildi!`);
                            })
                            .catch(error => {
                                console.error(error);
                                message.reply('Bir hata oluştu ve kullanıcıdan kayıtsız rolü alınamadı.');
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcıya yetki rolü verilemedi.');
                    });
            } else {
                message.reply('Etiketlenen kullanıcı sunucuda bulunmuyor!');
            }
        } else {
            message.reply('Kullanıcıyı etiketleyin!');
        }
    }

    
});

 // Kayıt Et
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'kayıtet') {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        const targetUser = message.mentions.users.first();
        if (targetUser) {
            const targetMember = message.guild.member(targetUser);
            if (targetMember) {
                const memberRoleId = '1115372247889223706'; // Member rolünün ID'si
                const kayitsizRoleId = '1115581015159734372'; // Kayıtsız rolünün ID'si

                targetMember.roles.add(memberRoleId)
                    .then(() => {
                        targetMember.roles.remove(kayitsizRoleId)
                            .then(() => {
                                message.reply(`${targetUser} kullanıcısına member rolü verildi ve kayıtsız rolü alındı!`);
                            })
                            .catch(error => {
                                console.error(error);
                                message.reply('Bir hata oluştu ve kullanıcıdan kayıtsız rolü alınamadı.');
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply('Bir hata oluştu ve kullanıcıya member rolü verilemedi.');
                    });
            } else {
                message.reply('Etiketlenen kullanıcı sunucuda bulunmuyor!');
            }
        } else {
            message.reply('Kullanıcıyı etiketleyin!');
        }
    }

    // Diğer komutlar buraya eklenecek
});

client.login('MTEyMTMyNDYzMDgwNDgxMTc4Ng.GGodnK.pYb1YnKwMu_fPXSTZUT3Fs5JlSN3LGpqgGSutk');
