import mongoose from 'mongoose'
import cartsSchema from './carts.schema.js'

const usersSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        address: { type: String, require: true },
        age: { type: Number, require: true },
        countryCode: { type: Number, require: true },
        phone: { type: Number, require: true },
        avatar: { type: String },
        email: { type: String, require: true },
        password: { type: String, require: true },
        cart: { type: cartsSchema, require: true }
    },
)

export default usersSchema