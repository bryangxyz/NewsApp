const mongoose = require('mongoose');

// Article Schema
const ArticleSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true
  },
  img: {
    type: String,
  }
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);