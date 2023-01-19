import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  id: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
      return ret;
    },
  },
  toObject: { versionKey: false },
  query: {
    byEmail(email: string) {
      return this.findOne({ email });
    },
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type userDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
