import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TaskConrtoller } from './tash.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '../img',
    }),
  ],
  providers: [TaskService],
  controllers: [TaskConrtoller],
})
export class TaskModule {}
