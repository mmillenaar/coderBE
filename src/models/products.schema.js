import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema(
    {
        timestamp: { type: Date, default: Date.now(), require: true },
        title: { type: String, require: true },
        description: { type: String },
        code: { type: String },
        thumbnail: { type: String },
        price: { type: Number, require: true },
        stock: { type: Number, require: true },
        quantity: { type: Number }
    },
)

export default productsSchema