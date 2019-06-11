const authResolver = require('./auth');
const booksResolver = require('./books');

const rootResolver = {
  ...authResolver,
  ...booksResolver,
};

module.exports = rootResolver;
