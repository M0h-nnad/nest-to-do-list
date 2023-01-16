import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: [Types.ObjectId], ref: 'Task' })
  task: [Types.ObjectId];
}

export type userDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
