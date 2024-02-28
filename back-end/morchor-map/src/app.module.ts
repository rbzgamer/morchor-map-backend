import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_DB_DEV,
      // process.env.MONBO_DB_PROD,
    ),
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
