import * as mongoose from 'mongoose';

export interface IBook {
  googleApiId: string;
}

const bookSchema = new mongoose.Schema({
  googleApiId: {
    type: String,
    required: true,
  },
});

export const Book = mongoose.model('Book', bookSchema);
