
const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            default: 'regular'
        },
        cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]
    },
    {
        timestamps: true, // SE USA PARA AGREGAR createdAt y updatedAt que es la fecha de creación y actualización
        versionKey: false // SE USA PARA NO AGREGAR __v que es un poco molesto`
    }
)

const User = model('user', userSchema)
module.exports = User



