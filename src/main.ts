import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: ['http://localhost:3000', process.env.FRONT_END],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use `PORT` provided in environment or default to 5000
  const port = process.env.PORT || 5000;

  // Listen on `port` and 0.0.0.0 or 5000
  await app.listen(port, '0.0.0.0');
}
bootstrap();
