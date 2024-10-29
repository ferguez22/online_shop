// URL BASE: /api

const router = require('express').Router()
const { checkToken } = require('../utils/middleware')

router.use('/products', require('./api/products.routes'))
router.use('/users', require('./api/users.routes'))

module.exports = router 