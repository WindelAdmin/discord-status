import { Injectable } from '@nestjs/common';

import CryptoJS from 'crypto-js';

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function getToken() {
  const passphrase = process.env.KEY_DECRYPT;
  const tokenToDecrypt = process.env.TOKEN;

  const tokenConvert = Buffer.from(tokenToDecrypt, 'base64').toString('utf-8');

  const bytes = CryptoJS.AES.decrypt(tokenConvert, passphrase);

  return await bytes.toString(CryptoJS.enc.Utf8);
}

@Injectable()
export class AppService {
  async getWebhook(data: any) {
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

    client.login(await getToken());
  }
}
