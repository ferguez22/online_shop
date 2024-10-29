// URL BASE: /api/products

const router = require('express').Router()
const { checkToken } = require('../../utils/middleware')

const { registerUser, loginUser, addProductToCart, getUserProfile } = require('../../controllers/users.controllers')

router.get('/profile', checkToken, getUserProfile)

router.post('/register', registerUser)
router.post('/login', loginUser)

router.put('/add/:productId', checkToken, addProductToCart)

module.exports = router