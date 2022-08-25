const express = require('express')
const app = express()
const products = require('./routes/products')
const { engine } = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/products', products)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening at port: ${server.address().port}`);
})
server.on("error", error => console.error(`Error in server ${error}`))