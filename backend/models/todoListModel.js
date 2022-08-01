const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    duedate: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('ToDoList', todoListSchema)