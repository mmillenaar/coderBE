import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        price: { type: Number, require: true },
        thumbnail: { type: String, require: true },
    },
)

export default productsSchema