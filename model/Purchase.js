const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    groundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    },
    date: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Purchase = mongoose.model("purchase", purchaseSchema);
module.exports = Purchase;