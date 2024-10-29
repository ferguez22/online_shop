
// Req.params: para extraer los datos de la URL
// req.query: para extraer los datos de la query string
// req.body: para extraer los datos del body

const bcrypt = require('bcryptjs')
const User = require('../models/users.model')
const { createToken } = require('../utils/helpers')

const registerUser = async (req, res, next) => {
    try {

        // Encrypt the password
        req.body.password = await bcrypt.hash(req.body.password, 10)

        // Insertamos el document
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        // Body: email, password
        const { email, password } = req.body

        // Existe el email en la BD ?
        const user = await User.findOne({ email })
        if (!user) return res.status(401), json({ Message: 'Email y/o contraseña incorrectos' })

        // Comparamos la contraseña
        const same = await bcrypt.compare(password, user.password)
        if (!same) return res.status(401).json({ Message: 'Email y/o contraseña incorrectos' })


        res.json({
            Message: '🚀 Login correcto 🚀 ',
            token: createToken(user)
        })
    } catch (error) {
        next(error)
    }
}

const addProductToCart = async (req, res, next) => {
    const { productId } = req.params
    try {
        req.user.cart.push(productId)
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}

const getUserProfile = async (req, res, next) => {
    res.json(req.user)
}

module.exports = { registerUser, loginUser, addProductToCart, getUserProfile }