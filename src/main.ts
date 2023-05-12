import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: [`${process.env.CLIENT_URL}`],
    }),
  );
  await app.listen(process.env.APP_PORT || 4000).catch((error) => {
    console.error(error);
  });
}
bootstrap();
