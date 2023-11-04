const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Enter a description for this expense'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Enter a amount for this expense'],
        trim: true,
    },
    color: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('Expense', expenseSchema)