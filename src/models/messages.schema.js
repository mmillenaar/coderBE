import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
    {
        email: { type: String, require: true },
        dat: { type: Date, require: true },
        message: { type: String, require: true },
    },
)

export default messagesSchema