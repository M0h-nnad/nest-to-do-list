import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { taskSchema, Task } from '../schema/task.model';
import { userSchema, User } from '../schema/user.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    UserService,
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
})
export class UserModule {}
