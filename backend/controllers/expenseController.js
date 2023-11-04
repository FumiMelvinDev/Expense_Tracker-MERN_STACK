const asyncHAndler = require('express-async-handler')
const Expense = require('../models/expenseModel')

// @desc Add Expense
// @route POST /api/expenses
// @access Private
const addExpense = asyncHAndler(async (req, res) => {
    const { description, amount, color } = req.body

    if (!description || !amount) {
        res.status(400).json({ message: 'Please fill all fields' });
        return;
    }

    const expense = await Expense.create({
        description,
        amount: parseFloat(amount),
        color,
        user: req.user.id
    })

    if (expense) {
        res.status(201).json({
            _id: expense.id,
            description: expense.description,
            amount: expense.amount,
            color: expense.color
        })
    } else {
        res.status(400).json({ message: 'Something went wrong' });
    }
})

// @desc Get Expense
// @route GET /api/expenses
// @access Private
const getExpense = asyncHAndler(async (req, res) => {
    const expense = await Expense.find({ user: req.user.id });

    res.status(200).json(
        expense
    )
})

// @desc Delete an Expense
// @route DELETE /api/expenses
// @access Private
const deleteExpense = asyncHAndler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        res.status(401)
        throw new Error('Expense not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('user not found')
    }

    if (expense.user.toString() !== req.user.id) {
        res.status(404)
        throw new Error('User not authorized')
    }

    await Expense.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Expense deleted successfully' })
})

module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}