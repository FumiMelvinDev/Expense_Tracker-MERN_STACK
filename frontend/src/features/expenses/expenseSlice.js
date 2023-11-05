import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import expenseService from './expenseService'

const initialState = {
    expenses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add expense
export const addExpense = createAsyncThunk('expenses/create', async (expenseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await expenseService.addExpense(expenseData, token)
    } catch (error) {
        const message = (error.resonse && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// get all expenses
export const getAllExpenses = createAsyncThunk('expenses/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await expenseService.getAllExpenses(token)
    } catch (error) {
        const message = (error.resonse && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // create
            .addCase(addExpense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenses.push(action.payload)
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
            // get
            .addCase(getAllExpenses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllExpenses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenses = action.payload
            })
            .addCase(getAllExpenses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
    }
})

export const { reset } = expenseSlice.actions

export default expenseSlice.reducer