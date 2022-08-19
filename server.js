const express = require('express')
const router = express.Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', router)

router.get('/', (req, res) => {
    res.send('todo ok')
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening at port: ${server.address().port}`);
})
server.on("error", error => console.error(`Error in server ${error}`))