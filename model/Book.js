const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Book = mongoose.model("books", bookSchema);
module.exports = Book;