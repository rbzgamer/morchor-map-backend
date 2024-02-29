import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:3000' || 'https://morchormap.netlify.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5000);
  // Use `PORT` provided in environment or default to 3000
  const port = process.env.PORT || 3000;

  // Listen on `port` and 0.0.0.0
  async function bootstrap() {
    // ...
    (await app.listen(port, '0.0.0.0')) || (await app.listen(5000));
  }
}
bootstrap();
