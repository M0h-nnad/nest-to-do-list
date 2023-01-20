import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(process.cwd());

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    TaskModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'img'),
      serveStaticOptions: {
        index: false,
      },
      serveRoot: '/img/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
