import { Injectable } from '@nestjs/common';
import { client } from './client';

@Injectable()
export class AppService {
  lastCommit: string = '';
  async getWebhook(data: any) {
    try {
      if (client.isReady) {
        const guild = client.guilds.cache.get(process.env.ID_SERVER);
        const channelBack: any = guild.channels.cache.find(
          (channel) => channel.name === 'back-commit',
        );
        const channelWinpay: any = guild.channels.cache.find(
          (channel) => channel.name === 'winpay-commit',
        );
        const channelWinSocket: any = guild.channels.cache.find(
          (channel) => channel.name === 'winsocket-commit',
        );
        const channelFront: any = guild.channels.cache.find(
          (channel) => channel.name === 'front-commit',
        );
        const channelWinImporter: any = guild.channels.cache.find(
          (channel) => channel.name === 'winimporter-commit',
        );

        if (data) {
          const commit = data?.commit?.commit?.message || '';

          const desc = data?.description || '';
          const state = data?.state || '';
          const emoji = guild.emojis.cache.find(
            (emoji) => emoji.name === state,
          );

          const message = `${commit} - ${desc}`.trim();

          if (message === this.lastCommit || message === '-') {
            return;
          }
          this.lastCommit = message;
          if (message !== '-') {
            if (data?.name === 'WindelAdmin/winpay') {
              const messages = await channelWinpay.messages.fetch({
                limit: 100,
              });
              channelWinpay.bulkDelete(messages);
              await channelWinpay.send(`${emoji} - ${message}`);
            } else if (data?.name === 'WindelAdmin/winsocket-ms') {
              const messages = await channelWinSocket.messages.fetch({
                limit: 100,
              });
              channelWinSocket.bulkDelete(messages);
              await channelWinSocket.send(`${emoji} - ${message}`);
            } else if (data?.name === 'WindelAdmin/windelback') {
              const messages = await channelBack.messages.fetch({
                limit: 100,
              });
              channelBack.bulkDelete(messages);
              await channelBack.send(`${emoji} - ${message}`);
            } else if (data?.name === 'WindelAdmin/windelfront') {
              const messages = await channelFront.messages.fetch({
                limit: 100,
              });
              channelFront.bulkDelete(messages);
              await channelFront.send(`${emoji} - ${message}`);
            } else if (data?.name === 'WindelAdmin/winimporter-ms') {
              const messages = await channelWinImporter.messages.fetch({
                limit: 100,
              });
              channelWinImporter.bulkDelete(messages);
              await channelWinImporter.send(`${emoji} - ${message}`);
            }
          }
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
