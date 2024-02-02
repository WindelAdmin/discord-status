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
            const messages = await channel.messages.fetch({
              limit: 100,
            });
            channel.bulkDelete(messages);

            await channel.send(`${emoji} - ${message}`);
          }
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
