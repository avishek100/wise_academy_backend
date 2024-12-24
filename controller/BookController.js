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
        const grounds = await Ground.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(grounds)
    } catch (e) {
        res.json(e)
    }
}
module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update

}