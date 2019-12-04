import * as DataLoader from 'dataloader';

import { Book } from '../../models/book';
import { User, IUser } from '../../models/user';

const bookLoader = new DataLoader((bookIds: number[]) => {
  return books(bookIds);
});

const books = async (bookIds: number[]) => {
  try {
    return await Book.find({ _id: { $in: bookIds } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addBookToCurrentUser: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error('User not found.');
      }
      let book = await Book.findOne({ googleApiId: args.bookId });
      if (book == null) {
        const newBook = new Book({
          googleApiId: args.bookId,
        });
        const result = await newBook.save();
        book = result;
      }
      const isBookOwned = creator.ownedBooks.find(
        (bookId: number) => bookId === book!._id.toString()
      );
      if (isBookOwned) {
        throw new Error('Book already owned by this user');
      }
      creator.ownedBooks.push(book.id);
      await creator.save();
      return creator;
    } catch (err) {
      throw err;
    }
  },
  getBooksCurrentUser: async (_args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const creator: IUser | null = await User.findById(req.userId);
      if (creator == null) {
        return;
      }
      const ownedBooks = () => bookLoader.loadMany(creator.ownedBooks);
      return ownedBooks();
    } catch (err) {
      throw err;
    }
  },
  addBook: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const book = new Book({
      googleApiId: args.bookInput.googleApiId,
    });

    try {
      const result = await book.save();
      return {
        ...result,
      };
    } catch (err) {
      throw err;
    }
  },
};
