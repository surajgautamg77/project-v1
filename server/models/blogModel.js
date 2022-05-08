const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "a blog must have a title"],
    trim: true,
    maxlength: [
      100,
      "A blog title must have less or equal then 100 characters",
    ],
    minlength: [10, "A tour name must have more or equal then 10 characters"],
  },
  subTitle: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  coverImage: {
    type: String,
  },
  content: {
    type: String,
    required: [true, "a blog must have content"],
  },
  author: {
    type: String,
    required: [true, "blog must have an auther"],
  },
});

module.exports = mongoose.model("article", blogSchema);
