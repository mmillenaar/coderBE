import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        address: { type: String, require: true },
        age: { type: Number, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
    },
)

export default usersSchema