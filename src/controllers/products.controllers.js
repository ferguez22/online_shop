
const Product = require('../models/products.model')

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('user', 'username email')
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    const { productId } = req.params
    try {
        const result = await Product.findById(productId)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const getProductByDepartment = async (req, res, next) => {
    const { department } = req.params
    try {
        const result = await Product.find({ department })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const getProductAvailable = async (req, res, next) => {
    try {
        const result = await Product.find({ available: true, stock: { $gte: 10 } })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const getProductByPrice = async (req, res, next) => {
    const { min, max } = req.query
    try {
        const result = await Product.find({ price: { $gte: min, $lte: max } })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user._id
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const result = await Product.findByIdAndUpdate(productId, req.body, { new: true })
        console.log(result)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const result = await Product.findByIdAndDelete(productId)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = { getProducts, getProductById, getProductAvailable, getProductByDepartment, getProductByPrice, createProduct, updateProduct, deleteProduct }