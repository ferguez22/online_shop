// MONGOOSE es una libreria odnne para trabajar con
// bases de datos no relacionales con mongodb


const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)