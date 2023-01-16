import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true, ref: 'User' })
  userId: Types.ObjectId;
}
// export const taskSchema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   img: { type: String, required: true },
//   userId: { type: Types.ObjectId, required: true, ref: 'user' },
// });

export type taskDocument = HydratedDocument<Task>;

export const taskSchema = SchemaFactory.createForClass(Task);
