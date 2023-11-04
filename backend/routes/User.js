const express = require('express')
const { getUser, registerUser, loginUser, getAdmin } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', protect, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router