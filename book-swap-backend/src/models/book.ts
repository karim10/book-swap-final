import * as mongoose from 'mongoose';

export interface IBook extends mongoose.Document{
  googleApiId: string;
}

const bookSchema = new mongoose.Schema({
  googleApiId: {
    type: String,
    required: true,
  },
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
