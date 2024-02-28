import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS with specific options
    app.enableCors({
      origin: 'http://localhost:3000', // Replace with the actual origin of your client application
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

  await app.listen(5000);
}
bootstrap();
