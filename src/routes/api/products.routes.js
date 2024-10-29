// URL BASE: /api/products

const router = require('express').Router()
const { checkToken } = require('../../utils/middleware')

const { getProducts, getProductByDepartment, getProductAvailable, getProductById, getProductByPrice, createProduct, updateProduct, deleteProduct, } = require('../../controllers/products.controllers')

router.get('/', getProducts)
router.get('/dpt/:department', getProductByDepartment)
router.get('/available', getProductAvailable)
router.get('/price', getProductByPrice)
router.get('/:productId', getProductById)

router.post('/', checkToken, createProduct)

router.put('/:productId', checkToken, updateProduct)

router.delete('/:productId', checkToken, deleteProduct)

module.exports = router