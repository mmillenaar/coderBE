const router = require('express').Router();
const { promises: fs } = require('fs')

// let carts = [
//     {
//         id: 1,
//         timestamp: 1662654279342,
//         cart: [
//             {
//                 "id": 1,
//                 "timestamp": 1662654279342,
//                 "title": "Escuadra",
//                 "description": "aaa",
//                 "code": "a",
//                 "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//                 "price": 123.45,
//                 "stock": 10
//             },
//             {
//                 "id": 2,
//                 "timestamp": 1662654279342,
//                 "title": "Calculadora",
//                 "description": "bbb",
//                 "code": "b",
//                 "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//                 "price": 234.56,
//                 "stock": 10
//             },
//             {
//                 "id": 3,
//                 "timestamp": 1662654279342,
//                 "title": "Globo Terráqueo",
//                 "description": "ccc",
//                 "code": "c",
//                 "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//                 "price": 345.67,
//                 "stock": 10
//             }
//         ],
//     }
// ]

class Container {
    constructor(filePath) {
        this.filePath = filePath
    }

    async getAll() {
        try {
            let content = await fs.readFile(this.filePath, 'utf-8')
            return JSON.parse(content)
        }
        catch {
            return []
        }
    }
    async saveCart(cart) {
        const fileContent = await this.getAll()
        let newId
        if (fileContent.length === 0) {
            newId = 1
        }
        else {
            const lastId = fileContent[fileContent.length - 1].id
            newId = lastId + 1
        }
        fileContent.push({ id: newId, timestamp: Date.now(), ...cart })
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent
    }
    async modifyCart(modifiedCart) {
        const fileContent = await this.getAll()
        const cartIndex = fileContent.findIndex(element => element.id === modifiedCart.id)
        fileContent[cartIndex] = modifiedCart
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent
    }
    async deleteById(id) {
        const fileContent = await this.getAll()
        const filteredList = fileContent.filter(element => element.id !== id)
        if (filteredList.length == fileContent.length) {
            throw new Error(`DELETE: id:${id} not found in ${JSON.stringify(this.filePath)}`)
        } else {
            fileContent.length = 0
            filteredList.map(element => fileContent.push(element))
        }
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent
    }
    async getById(id) {
        const fileContent = await this.getAll()
        let searchedIndex = fileContent.findIndex(element => element.id == id)
        if (searchedIndex < 0) {
            throw new Error(`GET: id:${id} not found in ${JSON.stringify(this.filePath)}`)
        }
        else {
            return fileContent[searchedIndex]
        }
    }
}
const cartList  = new Container('./data/cart.txt')

router
    .route('/')
    .post(async (req, res) => {
        const { products } = req.body
        let newCartProducts = {
            cart: JSON.parse(products)
        }
        const newCart = await cartList.saveCart(newCartProducts)
        res.send(newCart)
    })

router
    .route('/:id')
    .delete(async (req, res) => {
        let newCartList = await cartList.deleteById(parseInt(req.params.id))
        res.send(newCartList)
    })

router
    .route('/:id/products')
    .get(async (req, res) => {
        let requestedCart = await cartList.getById(parseInt(req.params.id))
        res.send(requestedCart.cart)
    })
    .post(async (req, res) => {
        const { products } = req.body
        let requestedCart = await cartList.getById(parseInt(req.params.id))
        JSON.parse(products).map(product => {
            requestedCart.cart.push(product)
        })
        requestedCart.timestamp = Date.now()
        const newCartProducts  = await cartList.modifyCart(requestedCart)
        res.send(newCartProducts)
    })

router
    .route('/:id/products/:id_prod')
    .delete(async (req, res) => {
        let requestedCart = await cartList.getById(parseInt(req.params.id))
        let filteredProducts = requestedCart.cart.filter(element => element.id !== parseInt(req.params.id_prod))
        requestedCart.cart.length = 0
        filteredProducts.map(element => requestedCart.cart.push(element))
        requestedCart.timestamp = Date.now()
        const newCartProducts  = await cartList.modifyCart(requestedCart)
        res.send(newCartProducts)
    })

exports.router = router