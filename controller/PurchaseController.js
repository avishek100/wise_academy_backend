const Purchase = require('../model/Purchase')

const findAll = async (req, res) => {
    try {
        const books = await Purchase.find();
        res.status(200).json(books);
    } catch (e) {
        res.json(e)
    }
}
const save = async (req, res) => {
    try {
        const books = new Purchase(req.body);
        await books.save();
        res.status(201).json(books)
    } catch (e) {
        res.json(e)
    }


}
module.exports = {
    findAll,
    save,


}