import { Injectable } from '@nestjs/common';
import { client as clientInstance } from './client';

@Injectable()
export class AppService {
  private lastCommit = '';

  isGuildReady() {
    return clientInstance.isReady;
  }
  async getWebhook(data: any) {
    if (!this.isGuildReady()) {
      return;
    }

    const guild = clientInstance.guilds.cache.get(process.env.ID_SERVER);
    const channels = {
      back: guild.channels.cache.find(
        (channel) => channel.name === 'back-commit',
      ),
      front: guild.channels.cache.find(
        (channel) => channel.name === 'front-commit',
      ),
      winpay: guild.channels.cache.find(
        (channel) => channel.name === 'winpay-commit',
      ),
      winSocket: guild.channels.cache.find(
        (channel) => channel.name === 'winsocket-commit',
      ),
      winImporter: guild.channels.cache.find(
        (channel) => channel.name === 'winimporter-commit',
      ),
      winReporter: guild.channels.cache.find(
        (channel) => channel.name === 'winreporter-commit',
      ),
    };

    if (data) {
      const { commit, name, description, state } = data;

      const commitMessage = this.getCommitMessage(commit, description);
      const emoji = guild.emojis.cache.find((emoji) => emoji.name === state);

      if (this.lastCommit === commitMessage || commitMessage === '-') {
        return;
      }

      this.lastCommit = commitMessage;

      const sendToChannel = async ({ message, channel }) =>
        channel
          .bulkDelete(await channel.messages.fetch({ limit: 100 }))
          .then(() => channel.send(`${emoji} - ${message}`));

      switch (name) {
        case 'WindelAdmin/winpay':
          sendToChannel({ message: commitMessage, channel: channels.winpay });
          break;
        case 'WindelAdmin/winsocket-ms':
          sendToChannel({
            message: commitMessage,
            channel: channels.winSocket,
          });
          break;
        case 'WindelAdmin/windelback':
          sendToChannel({ message: commitMessage, channel: channels.back });
          break;
        case 'WindelAdmin/windelfront':
          sendToChannel({ message: commitMessage, channel: channels.front });
          break;
        case 'WindelAdmin/winimporter-ms':
          sendToChannel({
            message: commitMessage,
            channel: channels.winImporter,
          });
          break;
        case 'WindelAdmin/win-reports-ms':
          sendToChannel({
            message: commitMessage,
            channel: channels.winReporter,
          });
          break;
        default:
          return;
      }
    }
  }

  private getCommitMessage(commit: string, description: string) {
    return `${commit} - ${description}`.trim();
  }
}
