const express = require('express')
const { getIncome, addIncome, deleteIncome } = require('../controllers/incomeController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', protect, getIncome)
router.post('/', protect, addIncome)
router.delete('/:id', protect, deleteIncome)

module.exports = router