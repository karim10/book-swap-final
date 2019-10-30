const DataLoader = require('dataloader');

const Book = require('../../models/book');
const User = require('../../models/user');

const bookLoader = new DataLoader(bookIds => {
  return books(bookIds);
});

const books = async (bookIds) => {
  try {
    return await Book.find({ _id: { $in: bookIds } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addBookToCurrentUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error('User not found.');
      }
      let book = await Book.findOne({ googleApiId: args.bookId });
      if (book === null) {
        const newBook = new Book({
          googleApiId: args.bookId
        });
        const result = await newBook.save();
        book = result;
      }
      const isBookOwned = creator.ownedBooks.find(bookId => bookId = book._id) !== undefined;
      if (isBookOwned) {
        throw new Error('Book already owned by this user');
      }
      creator.ownedBooks.push(book._doc);
      await creator.save();
      return creator;
    } catch (err) {
      throw err;
    }
  },
  getBooksCurrentUser: async (_args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      console.log("somehing");
      const creator = await User.findById(req.userId);
      console.log("HI: ", creator.ownedBooks);
      const ownedBooks = () => bookLoader.loadMany(creator.ownedBooks);
      console.log("HELLO: ", ownedBooks());
      return ownedBooks();
    } catch (err) {
      throw err;
    }
  },
  addBook: async (args) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const book = new Book({
      googleApiId: args.bookInput.googleApiId
    });

    try {
      const result = await book.save(book);
      return {
        ...result._doc,
      }
    } catch (err) {
      throw err;
    }
  }
};
