import { Document } from 'mongoose';

export interface ITask extends Document {
  readonly title: string;
  readonly content: string;
  readonly img: string;
  readonly userId: string;
}
