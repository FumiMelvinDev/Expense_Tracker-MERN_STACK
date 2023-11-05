import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import incomeService from './incomeService'

const initialState = {
    incomes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add income
export const addIncome = createAsyncThunk('incomes/create', async (incomeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await incomeService.addIncome(incomeData, token)
    } catch (error) {
        const message = (error.resonse && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// get allincome
export const getAllIncome = createAsyncThunk('incomes/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await incomeService.getAllIncome(token)
    } catch (error) {
        const message = (error.resonse && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // create
            .addCase(addIncome.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomes.push(action.payload)
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
            // get
            .addCase(getAllIncome.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllIncome.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.incomes = action.payload
            })
            .addCase(getAllIncome.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
    }
})

export const { reset } = incomeSlice.actions

export default incomeSlice.reducer