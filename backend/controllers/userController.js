const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(404)
        throw new Error('Please fill all fields')
    }

    // check if user already exists
    const user = await User.findOne({ email })

    if (user) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Something went wrong')
    }
})

// @desc login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(404)
        throw new Error('Please fill all fields')
    }

    // check for user email
    const user = await User.findOne({ email })

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password.toString(), user.password)

    if (user && isMatch) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

// @desc Get user
// @route GET /api/users
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        _id: _id,
        name,
        email,
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getUser,
    registerUser,
    loginUser
}
