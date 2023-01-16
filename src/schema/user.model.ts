import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// import { Schema, Types } from 'mongoose';
// export const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   tasks: [Types.ObjectId],
// });

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, ref: 'Task' })
  task: Types.ObjectId;
}

export type userDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
