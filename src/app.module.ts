import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose/dist';

import { taskSchema, Task } from './schema/task.model';
import { userSchema, User } from './schema/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
