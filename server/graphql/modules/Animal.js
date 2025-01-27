const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    id: String,
    name: String,
    breed: String,
    color: String
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;