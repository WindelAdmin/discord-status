import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWebhook(data: any) {
    console.log('data: ', data);
  }
}
