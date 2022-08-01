require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoListRoutes = require('./routes/todoList')

const app = express()

// Middleware - to have access on the req.body
app.use(express.json())

// Middleware - to get path and method of the request that coming in
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/todoList', todoListRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('----- Connected to the database -----');
        app.listen(process.env.PORT, () => {
            console.log('------ Listening to port', process.env.PORT, ' ------');
        })
    })
    .catch((err) => {
        console.log(err);
    })

