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
              await channelWinpay.send(`${emoji} - ${message}`);
            } else if (data?.name === 'WindelAdmin/windel-socket-ms') {
              await channelWinSocket.send(`${emoji} - ${message}`);
            } else if (data?.name === 'WindelAdmin/windelback') {
              await channelBack.send(`${emoji} - ${message}`);
            }
          }
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
