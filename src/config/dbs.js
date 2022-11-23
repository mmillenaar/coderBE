import dotenv from 'dotenv'
dotenv.config()

export default {
    mongoDb: {
        URL: process.env.MONGOURL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}