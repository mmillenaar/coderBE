import express from 'express'
import dotenv from 'dotenv'
import productsRouter from './routes/products.route.js'
import cartsRouter from './routes/carts.route.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Error handler
app.all('*', (req, res, next) => {
    const err = new Error('Bad request')
    err.status = 400
    err.message = `Route:${req.originalUrl} and method:${req.method} not implemented`
    next(err)
})
app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500
    }
    res.status(err.status).send(err.message)
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening at port: ${server.address().port}`);
})
server.on("error", error => console.error(`Error in server: ${error}`))