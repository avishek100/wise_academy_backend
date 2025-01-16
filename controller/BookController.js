const Book = require('../model/Book')

const findAll = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (e) {
        res.json(e)
    }
}
const save = async (req, res) => {
    try {
        const { name, description } = req.body
        const books = new Book({
            name,
            description,
            image: req.file.originalname
        })
        await books.save();
        res.status(201).json(books)
    } catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const customer = await Ground.findById(req.params.id);
        res.status(200).json(customer)
    } catch (e) {
        res.json(e)
    }
}
const deleteById = async (req, res) => {
    try {
        const grounds = await Ground.findByIdAndDelete(req.params.id);
        res.status(200).json("data deleted")
    } catch (e) {
        res.json(e)
    }
}
const update = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Find the ground by ID
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Ground not found" });
        }

        // Update fields
        book.name = name || book.name;
        book.description = description || book.description;

        // Check if a new image file is uploaded
        if (req.file) {
            book.image = req.file.originalname;
        }

        // Save the updated document
        await book.save();

        res.status(201).json(book);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update

}