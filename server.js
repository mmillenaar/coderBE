const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const products = require('./routes/products')
const productsTest = require('./routes/products-test')
const { engine } = require('express-handlebars')
// const Container = require('./DB/Container.js')
// const path = require('path')
const FsChatContainer = require('./DB/FsChatContainer')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.set('socketio', io)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/products', products.router)
app.use('/api/products-test', productsTest.router)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// const chatOptions = {
//     client: 'sqlite3',
//     connection: { filename: path.resolve(__dirname, './DB/chat.sqlite') },
//     useNullAsDefault: true
// }
// const productOptions = {
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'root',
//         database: 'products',
//     }
// }
// const chatSQL = new Container('chat', chatOptions)
// const productsSQL = new Container('products', productOptions)
const chatFs = new FsChatContainer.FsChatContainer('./DB/chat.json')

io.on('connection', async socket => {
    try {
        console.log('New client connected');
        //First render
        const chatData = await chatFs.getAllMessages()
        const productsData = productsTest.productList
        socket.emit('firstRender', { productsData, chatData })

        //New chat message
        socket.on('new-message', async message => {
            await chatFs.insertMessage(message)
            const newChatData = await chatFs.getAllMessages()
            io.sockets.emit('new-chat-message', newChatData)
        })
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