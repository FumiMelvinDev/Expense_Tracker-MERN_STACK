const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter a title for this income'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Enter a amount for this income'],
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

module.exports = mongoose.model('Income', incomeSchema)