import { Injectable } from '@nestjs/common';
import { client } from './client';

@Injectable()
export class AppService {
  async getWebhook(data: any) {
    try {
      if (client.isReady) {
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
          const mes = data?.commit?.commit?.message || '';
          console.log('mes: ', mes);
          const desc = data?.description || '';

          const message = `${mes} - ${desc}`;
          await channel.send(message);
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
