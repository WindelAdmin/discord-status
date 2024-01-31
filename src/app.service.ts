import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
var crypto = require('crypto');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

@Injectable()
export class AppService {
  async getWebhook(data: any) {
    try {
      function getToken() {
        return process.env.TOKEN;
      }
      client.on('ready', async () => {
        const date = new Date();

        const guild = client.guilds.cache.get(process.env.ID_SERVER);
        const channel: any = guild.channels.cache.find(
          (channel) => channel.name === 'back-commit',
        );

        // LIMPAR CANAL
        // const channelWelcome = guild.channels.cache.find(
        //   (channel) => channel.name === 'bem-vindo'
        // );

        // const messagess = await channelWelcome.messages.fetch({
        //   limit: 40,
        // });

        // messagess.forEach(async (element) => {
        //   await element.delete();
        // });

        if (data) {
          const message = `${data.commit.commit.message} - ${data.description}`;
          channel.send(message);
        }
      });

      const token = getToken();

      client.login(token);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
