import { Injectable } from '@nestjs/common';

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

@Injectable()
export class AppService {
  async getWebhook(data: any) {
    const getToken = () => {
      return process.env.TOKEN;
    };

    client.on('ready', async () => {
      const date = new Date();
      console.log(
        `Logged in as ${
          client.user.tag
        }! ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      );

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
        channel.send(data);
      }
    });

    client.login(getToken());
  }
}
