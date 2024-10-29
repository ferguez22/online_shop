
// - Usamos .toBe para comparar valores de tipo string, number, boolean, etc.

// Usamos .toContain para ver si el contenido contiene un string
//  (En este caso para ver si el contenido de la cabecera contiene application/json)

// - Usamos .toBeInstanceOf para verificar si el objeto es una instancia de una clase

// - Usamos .toBeDefined para verificar si el valor no es undefined

const request = require('supertest')
const app = require('../../src/app')
const mongoose = require('mongoose')
const Product = require('../../src/models/products.model')

describe('API Products', () => {
    beforeAll(async () => {
        // Conectamos a la base de datos
        await mongoose.connect('mongodb://127.0.0.1:27017/online_shop')
    })
    afterAll(async () => {
        // Desconectamos la base de datos
        await mongoose.disconnect()
    })

    describe('GET /api/products', () => {

        let response
        beforeAll(async () => {
            response = await request(app).get('/api/products').send()
        })

        it('Deberia recibir un status 200', () => {
            expect(response.statusCode).toBe(200)
        })

        it('Deberia responder con un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Deberia reponder con un array', () => {
            expect(response.body).toBeInstanceOf(Array)
        })
    })
    //////////////////////////////////////////////
    describe('POST /api/products', () => {

        let response
        const body = {
            name: "Lapiz Verde",
            description: "Un lapiz de color verde",
            department: "test",
            price: 3.99,
            stock: 100,
            available: true
        }

        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body)
        })

        afterAll(async () => {
            // Borrar los productos con department test
            await Product.deleteMany({ department: 'test' })
        })

        it('Deberia recibir un status 201 y ser un JSON', () => {
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toContain('application/json')

        })

        it('Deberia devoler el _id', () => {
            expect(response.body._id).toBeDefined()
        })

        it('Los valores enviados son los mismo que se guardan', () => {
            expect(response.body.name).toBe(body.name)
            expect(response.body.description).toBe(body.description)
            expect(response.body.department).toBe(body.department)
            expect(response.body.price).toBe(body.price)
            expect(response.body.stock).toBe(body.stock)
            expect(response.body.available).toBe(body.available)
        })

    })
    //////////////////////////////////////////////
    describe('PUT /api/products/<PRODUCTID>', () => {

        let product
        let response
        const body = {
            name: 'Lápiz verde', description: 'Pinta en verde', department: 'test', price: 14, stock: 200,
            available: true
        };

        beforeAll(async () => {
            // 1. Crear el producto que vamos a actualizar
            product = await Product.create(body);

            // 2. Lanzar la petición PUT sobre el producto anterior
            response = await request(app)
                .put(`/api/products/${product._id}`)
                .send({ price: 30, stock: 300 })
        });

        afterAll(async () => {
            // 3. Borrar el producto creado para las pruebas
            await Product.findByIdAndDelete(product._id)
        });

        // status
        it('Deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('Deberia tener los campos actualizados en la BD', () => {
            expect(response.body.price).toBe(30)
            expect(response.body.stock).toBe(300)
        });
    })
    //////////////////////////////////////////////
    describe('DELETE /api/products/<PRODUCTID>', () => {
        let product
        let response
        const body = {
            name: 'Lápiz verde', description: 'Pinta en verde', department: 'test', price: 14, stock: 200,
            available: true
        }
        beforeAll(async () => {
            // 1. Crear el producto que vamos a actualizar
            product = await Product.create(body);

            // 2. Lanzar la petición PUT sobre el producto anterior
            response = await request(app)
                .delete(`/api/products/${product._id}`)
                .send()
        })
        afterAll(async () => {
            // 3. Borrar el producto creado para las pruebas
            await Product.findByIdAndDelete(product._id)
        })

        it('Deberia funcionar la URL', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('El producto no debería existir en la BD', async () => {
            const productDeleted = await Product.findById(product._id)
            expect(productDeleted).toBeNull()
        });
    })
})