const Book = require('../../models/book');
const User = require('../../models/user');

module.exports = {
  books: async () => {
    try {
      return await Book.find();
    } catch (err) {
      throw new Error(err);
    }
  },
  addBookToCurrentUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      // hardcoded userId
      const creator = await User.findById('5cffc0d7c675257807d8f896');
      if (!creator) {
        throw new Error('User not found.');
      }
      const book = await Book.findOne({_id: args.bookId});
      console.log(book);
      creator.ownedBooks.push(book._doc);
      await creator.save();
      return creator;
    } catch (err) {
      throw err;
    }
  },
  addBook: async (args) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
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