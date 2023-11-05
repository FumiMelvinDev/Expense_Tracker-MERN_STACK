import axios from 'axios'

const API_URL = '/api/expenses/'

// Add expense
const addExpense = async (expenseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, expenseData, config)

    return response.data
}

// Get all expenses
const getAllExpenses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const expenseService = {
    addExpense,
    getAllExpenses
}

export default expenseService