import { Client } from 'discord.js';

export function isGuildReady(clientInstance: Client) {
  return clientInstance.isReady;
}
