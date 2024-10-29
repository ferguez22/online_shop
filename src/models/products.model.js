
const { Schema, model } = require('mongoose')

const productSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        department: String,
        stock: Number,
        available: Boolean,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    },
    {
        timestamps: true, // SE USA PARA AGREGAR createdAt y updatedAt que es la fecha de creación y actualización
        versionKey: false // SE USA PARA NO AGREGAR __v a la base de datos
    }
)

const Product = model('product', productSchema)
module.exports = Product 