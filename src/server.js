import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import { engine } from 'express-handlebars'

import productsApiRouter from './routes/api/products.js'
import productsTestApiRouter from './routes/api/products-test.js'
import socketMessagesConfiguration from './routes/sockets/messages.ws.js'
import socketProductsConfiguration from './routes/sockets/products.ws.js'
import sessionAuth from './middlewares/sessionAuth.js'
import { passportMiddleware, passportSessionHandler } from './middlewares/passport.js'
import { getFailedLogin, getFailedRegister, getLogin, getLogout, getRegister, getRoot, postLogin, postRegister } from './controllers.js'


const app = express()
dotenv.config()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', productsApiRouter)
app.use('/api/products-test', productsTestApiRouter)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(session({
    secret: 'holaFedeeee',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))
app.use(passportMiddleware)
app.use(passportSessionHandler)

// ROOT
app.get('/', sessionAuth, getRoot)
//LOGIN
app.get('/login', getLogin)
app.post('/login', postLogin)
app.get('/failedlogin', getFailedLogin)
//REGISTER
app.get('/register', getRegister)
app.post('/register', postRegister)
app.get('/failedregister', getFailedRegister)
//LOGOUT
app.get('/logout', getLogout)


io.on('connection', async socket => {
    try {
        console.log('New client connected');
        socketMessagesConfiguration(socket, io.sockets)
        socketProductsConfiguration(socket, io.sockets)
    }
    catch(err) {
        console.log(err);
    }
})

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening at port: ${httpServer.address().port}`);
})
server.on("error", error => console.error(`Error in server ${error}`))