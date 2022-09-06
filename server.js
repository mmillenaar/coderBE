const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const products = require('./routes/products')
const { engine } = require('express-handlebars')
const { promises: fs } = require('fs')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.set('socketio', io)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/products', products.router)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const productList = products.productList
const messages = []

io.on('connection', socket => {
    console.log('New client connected');

    // First render
    socket.emit('firstRender', { productList, messages })

    //Chat
    socket.on('new-message', message => {
        messages.push(message)
        fs.appendFile('chat.txt', JSON.stringify(message), (err) => {
            err && console.error(err)
        })
        io.sockets.emit('new-chat-message', messages)
    })
})

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening at port: ${httpServer.address().port}`);
})
server.on("error", error => console.error(`Error in server ${error}`))

module.exports.app = app