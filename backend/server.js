const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000
const colors = require('colors');
const { errorHandler } = require('./middleware/errMiddleware');
const connectDB = require('./config/db');

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/income', require('./routes/Income'))
app.use('/api/expenses', require('./routes/Expense'))
app.use('/api/users', require('./routes/User'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server started at ${port}`))