import { Injectable } from '@nestjs/common';
import { client } from './client';

@Injectable()
export class AppService {
  lastCommit: string = '';
  async getWebhook(data: any) {
    try {
      if (client.isReady) {
        const guild = client.guilds.cache.get(process.env.ID_SERVER);
        const channel: any = guild.channels.cache.find(
          (channel) => channel.name === 'back-commit',
        );

        if (data) {
          const commit = data?.commit?.commit?.message || '';

          const desc = data?.description || '';

          const message = `${commit} || ${desc}`.trim();

          if (message === this.lastCommit) {
            return;
          }
          this.lastCommit = message;
          console.log('message: ', message);
          if (message !== '||') {
            await channel.send(message);
          }
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
