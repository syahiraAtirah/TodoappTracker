const ToDoList = require('../models/todoListModel')
const mongoose = require('mongoose')

const getTodos = async (req, res) => {
    const todolist = await ToDoList.find({}).sort({ done: false, duedate: 1, updatedAt: 1 })
    res.status(200).json(todolist)   
}   

const getTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'The ToDoList is not exist. (There is no such ID)' })
    }

    const todolist = await ToDoList.findById({ _id: id })

    if (!todolist) {
        return res.status(404).json({ error: 'No such ToDoList'})
    }

    res.status(200).json(todolist)
}

const createTodo = async (req, res) => {
    const { title, note, duedate } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!duedate) {
        emptyFields.push('duedate')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in the fields.', emptyFields })
    }

    try {
        const todolist = await ToDoList.create({ title, note, duedate, done: false })
        res.status(200).json(todolist)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}  

const deleteTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'The ToDoList is not exist. (There is no such ID)' })
    }

    const todolist = await ToDoList.findOneAndDelete({ _id: id })

    if (!todolist) {
        return res.status(404).json({ error: 'No such ToDoList'})
    }

    res.status(200).json(todolist)
} 
  
const updateTodo = async (req, res) => { 
    const { id } = req.params
    const { done } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'The ToDoList is not exist. (There is no such ID)' })
    }   

    const todolist = await ToDoList.findByIdAndUpdate({ _id: id }, {
        done
    })
   
    if (!todolist) {
        return res.status(404).json({ error: 'No such ToDoList'})
    } 

    res.status(200).json(todolist)
    console.log('todolist: ', todolist)
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}