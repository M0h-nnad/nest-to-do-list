import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
  id: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform(doc, ret, options) {
      delete ret._id;
      return ret;
    },
  },
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  imgRef: string;

  @Prop({ required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export type taskDocument = HydratedDocument<Task>;

export const taskSchema = SchemaFactory.createForClass(Task);
