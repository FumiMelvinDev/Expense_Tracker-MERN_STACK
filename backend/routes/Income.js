const express = require('express')
const { getIncome, addIncome } = require('../controllers/incomeController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', protect, getIncome)
router.post('/', protect, addIncome)

module.exports = router