import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  ))
  //app.useGlobalGuards(new AuthGuard())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
