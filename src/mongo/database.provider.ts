import * as mongoose from 'mongoose';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {
      mongoose.connect(process.env.DATABASE_URI).then(() => {
        console.log('Connected To DataBase');
      });
    },
  },
];
