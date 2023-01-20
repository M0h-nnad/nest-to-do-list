import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Task, taskSchema } from 'src/schema/task.model';
import { TaskConrtoller } from './tash.controller';
import { TaskService } from './task.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './img',
        filename(req, file, callback) {
          const fileNameSplit = file.originalname.split('.');
          const ext = fileNameSplit[fileNameSplit.length - 1];
          fileNameSplit.pop();
          const filename = fileNameSplit.join(' ');
          callback(null, `${filename}-${Date.now()}.${ext}`);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }]),
  ],
  controllers: [TaskConrtoller],
  providers: [TaskService],
})
export class TaskModule {}
