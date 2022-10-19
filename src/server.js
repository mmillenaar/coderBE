import express from 'express'
import session from 'express-session'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import { engine } from 'express-handlebars'

import productsApiRouter from './routes/api/products.js'
import productsTestApiRouter from './routes/api/products-test.js'
import socketMessagesConfiguration from './routes/sockets/messages.ws.js'
import socketProductsConfiguration from './routes/sockets/products.ws.js'


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', productsApiRouter)
app.use('/api/products-test', productsTestApiRouter)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')


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