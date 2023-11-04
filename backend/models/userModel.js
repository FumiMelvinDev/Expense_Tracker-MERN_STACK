const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true,
        minLength: [8, 'Password should be atleast 8 characters long']
    },
},
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('User', userSchema)