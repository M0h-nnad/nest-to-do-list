import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { taskSchema, Task, taskDocument } from '../schema/task.model';
import { userSchema, User, userDocument } from '../schema/user.model';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema },
      { name: User.name, schema: userSchema },
    ]),

    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        inject: [],
        useFactory: function (task: Model<taskDocument>) {
          const schema = userSchema;
          schema.pre('deleteOne', async function (this: userDocument) {
            await task.deleteMany({ userId: this._id });
          });
        },
      },
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

    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        inject: [],
        useFactory: function (task: Model<taskDocument>) {
          const schema = userSchema;
          schema.pre('deleteOne', async function (this: userDocument) {
            await task.deleteMany({ userId: this._id });
          });
        },
      },
    ]),
  ],
})
export class UserModule {}
