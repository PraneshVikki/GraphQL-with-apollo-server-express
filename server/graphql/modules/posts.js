const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    author_id: String,
}); 

const Post = mongoose.model('Post', postSchema);
module.exports = Post;