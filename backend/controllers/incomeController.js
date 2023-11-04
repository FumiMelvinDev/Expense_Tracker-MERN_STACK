const asyncHAndler = require('express-async-handler')
const Income = require('../models/incomeModel')

// @desc Add Income
// @route POST /api/income
// @access Private
const addIncome = asyncHAndler(async (req, res) => {
    const { title, amount } = req.body

    if (!title || !amount) {
        res.status(400).json({ message: 'Please fill all fields' });
        return;
    }

    const income = await Income.create({
        title,
        amount: parseFloat(amount),
        user: req.user.id
    })

    if (income) {
        res.status(201).json({
            _id: income.id,
            title: income.title,
            amount: income.amount
        })
    } else {
        res.status(400).json({ message: 'Something went wrong' });
    }
})

// @desc Delete an Income
// @route DELETE /api/income
// @access Private
const deleteIncome = asyncHAndler(async (req, res) => {
    const income = await Income.findById(req.params.id);

    if (!income) {
        res.status(401)
        throw new Error('Income not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('user not found')
    }

    if (income.user.toString() !== req.user.id) {
        res.status(404)
        throw new Error('User not authorized')
    }

    await Income.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Income deleted successfully' })
})

// @desc Get Income
// @route GET /api/income
// @access Private
const getIncome = asyncHAndler(async (req, res) => {
    const income = await Income.find({ user: req.user.id });

    res.status(200).json(
        income
    )
})

module.exports = {
    addIncome,
    getIncome,
    deleteIncome
}