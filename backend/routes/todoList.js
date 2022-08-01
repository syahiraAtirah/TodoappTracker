const express = require('express')
const { getTodos, getTodo, createTodo, deleteTodo, updateTodo } = require('../controllers/todolistController')

const router = express.Router()

// Get all todoList
router.get('/', getTodos)

// Get a todoList
router.get('/:id', getTodo)

// Create a new todoList
router.post('/', createTodo)

// Delete a new todoList
router.delete('/:id', deleteTodo)

// Update a new todoList
router.patch('/:id', updateTodo)

module.exports = router