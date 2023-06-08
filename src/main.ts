import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: [`${process.env.CLIENT_URL}`],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessage = errors
          .map((error) => Object.values(error.constraints))
          .flat()
          .join(', ');
        return new BadRequestException(errorMessage);
      },
    }),
  );
  await app.listen(process.env.APP_PORT || 4000).catch((error) => {
    console.error(error);
  });
}
bootstrap();
