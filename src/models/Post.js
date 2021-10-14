const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  uodatedAt: { type: Date }
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
