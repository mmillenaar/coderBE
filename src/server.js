import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import cluster from 'cluster'
import os from 'os'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import { engine } from 'express-handlebars'

import productsApiRouter from './routes/api/products.js'
import productsTestApiRouter from './routes/api/products-test.js'
import socketMessagesConfiguration from './routes/sockets/messages.ws.js'
import socketProductsConfiguration from './routes/sockets/products.ws.js'
import { passportMiddleware, passportSessionHandler } from './middlewares/passport.js'
import loginRouter from './routes/users/login.js'
import registerRouter from './routes/users/register.js'
import homeRouter from './routes/home.js'
import logoutRouter from './routes/users/logout.js'
import processInfoRouter from './routes/processInfo/processInfo.js'
import randomsApiRouter from './routes/api/randoms.js'


const app = express()
dotenv.config()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))


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

app.use('/api/products', productsApiRouter)
app.use('/api/products-test', productsTestApiRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use('/info', processInfoRouter)
app.use('/api/randoms', randomsApiRouter)
app.use(homeRouter)

const args = yargs(hideBin(process.argv))
args
    .default({
        port: 8080,
        mode: 'fork',
    })
    .alias({
        p: 'port',
        m: 'mode'
    })
    .argv

const PORT = args.argv.port
const createServer = (port) => {
    const server = httpServer.listen(port, () => {
        console.log(`Server listening at port: ${httpServer.address().port}`)
    })
    server.on("error", error => console.error(`Error in server ${error}`))
}

if (args.argv.mode === 'cluster') {
    if (cluster.isPrimary) {
        console.log(`${args.argv.mode} mode`);
        console.log(`Master ${process.pid} is running`);
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork()
        }

        cluster.on('exit', worker => {
            console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            // cluster.fork()
        })
    }
    else {
        createServer(PORT)
        console.log(`WORKER PID: ${process.pid}`);
    }
}
else {
    console.log(`${args.argv.mode} mode in port ${PORT}`);
    createServer(PORT)
}
