import mongoose from 'mongoose'
import productsSchema from './products.schema.js'

const cartsSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now(), require: true },
    products: { type: [productsSchema], require: true }
})

export default cartsSchema