const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    id: String,
    name: String,
});

const author = mongoose.model('Author', authorSchema);
module.exports = author;