const { Schema, model } = require('mongoose')

module.exports = model('courses', new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    categoryId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
}))