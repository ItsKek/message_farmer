const { Client } = require('discord.js');
const config = require('../config.json');

const client = new Client();

client.login(config.token);
console.log("Успешный вход.. Получаю информацию из конфига")
console.log("Твой дискорд токен:", config.token)
client.on('ready', () => {
    config.commands.forEach(command => {
        const channel = client.channels.get(command.channelID);
        if(!channel || !command.active) return;
        setInterval(() => {
            try {
                if(command.inventory.say.count > 0 && command.inventory.say.active) {
                    channel.send(command.inventory.say.content).catch(() => {});
                    console.log("\x1b[36m%s\x1b[0m", "Сообщение отправлено.")
                    command.inventory.say.count--
                } else if(command.inventory.say1.count > 0 && command.inventory.say1.active) {
                    channel.send(command.inventory.say1.content).catch(() => {});
                    command.inventory.say1.count--
                };
            } catch {};
        }, command.interval);
    }); 
});