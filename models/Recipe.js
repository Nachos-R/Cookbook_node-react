const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  versions: {
    type: Array
  }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
