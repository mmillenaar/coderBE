import express from 'express'
import dotenv from 'dotenv'
import { engine } from 'express-handlebars'
import session from 'express-session'

import { passportMiddleware, passportSessionHandler } from './middlewares/passport.middleware.js'

import productsRouter from './routes/products/products.js'
import cartsRouter from './routes/carts/carts.js'
import loginRouter from './routes/users/login.js'
import registerRouter from './routes/users/register.js'
import logoutRouter from './routes/users/logout.js'
import homeRouter from './routes/web/home.js'
import userCartRouter from './routes/carts/userCart.js'

const app = express()
dotenv.config()
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/cart', userCartRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use(homeRouter)

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