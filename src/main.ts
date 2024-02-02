import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { client } from './client';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  await client.login(process.env.TOKEN);
}
bootstrap();
