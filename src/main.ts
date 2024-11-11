import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server run in port: http://localhost:3000`);
  });
}

bootstrap();
