const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleApiId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
