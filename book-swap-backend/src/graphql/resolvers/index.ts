import authResolver = require('./auth');
import booksResolver = require('./books');

const rootResolver = {
  ...authResolver,
  ...booksResolver,
};

module.exports = rootResolver;
