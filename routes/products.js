const router = require('express').Router();
const { promises: fs } = require('fs')

let isAdmin = true
// let products = [
    // {
    //     "id": 1,
    //     "timestamp": 1662654279342,
    //     "title": "Escuadra",
    //     "description": "aaa",
    //     "code": "a",
    //     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    //     "price": 123.45,
    //     "stock": 10
    // },
    // {
    //     "id": 2,
    //     "timestamp": 1662654279342,
    //     "title": "Calculadora",
    //     "description": "bbb",
    //     "code": "b",
    //     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    //     "price": 234.56,
    //     "stock": 10
    // },
    // {
    //     "id": 3,
    //     "timestamp": 1662654279342,
    //     "title": "Globo Terráqueo",
    //     "description": "ccc",
    //     "code": "c",
    //     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    //     "price": 345.67,
    //     "stock": 10
    // }
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
    async save(product) {
        const fileContent = await this.getAll()
        let newId
        if (fileContent.length == 0) {
            newId = 1
        } else {
            const lastId = fileContent[fileContent.length - 1].id
            newId = lastId + 1
        }
        fileContent.push({ id: newId, timestamp: Date.now(), ...product })
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent
    }
    async modify(modifiedProduct) {
        const fileContent = await this.getAll()
        const productIndex = fileContent.findIndex(element => element.id === modifiedProduct.id)
        fileContent[productIndex] = modifiedProduct
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
        let productIndex = fileContent.findIndex(element => element.id == id)
        if (productIndex < 0) {
            throw new Error(`Product not found`)
        }
        else {
            return fileContent[productIndex]
        }
    }
    async deleteById(id) {
        const fileContent = await this.getAll()
        const filteredList = fileContent.filter(element => element.id !== id)
        if (filteredList.length == fileContent.length) {
            throw new Error(`Product not found`)
        }
        try {
            await fs.writeFile(this.filePath, JSON.stringify(filteredList, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return filteredList
    }
}
const productList = new Container('./data/products.txt')

router
    .route('/:id?')
    .get(async (req, res) => {
        if (req.params.id) {
            try {
                let requestedProduct = await productList.getById(parseInt(req.params.id))
                res.send(requestedProduct)
            }
            catch {
                throw new Error(`id:${req.params.id} not found`)
            }
        }
        else {
            res.send(await productList.getAll())
        }
    })

if (isAdmin) {
    router
        .route('/')
        .post(async (req, res) => {
            const { title, description, code, thumbnail, price, stock } = req.body
            let newProduct = {
                title: title,
                description: description,
                code: code,
                thumbnail: thumbnail,
                price: JSON.parse(price),
                stock: JSON.parse(stock)
            }
            let newList = await productList.save(newProduct)
            res.send(newList)
        })
    router
        .route('/:id')
        .put(async (req, res) => {
            let requestedProduct = await productList.getById(parseInt(req.params.id))
            const { title, description, code, thumbnail, price, stock } = req.body
            requestedProduct = {
                id: requestedProduct.id,
                timestamp: Date.now(),
                title: title ? title : requestedProduct.title,
                description: description ? description : requestedProduct.description,
                code: code ? code : requestedProduct.code,
                thumbnail: thumbnail ? thumbnail : requestedProduct.thumbnail,
                price: price ? JSON.parse(price) : requestedProduct.price,
                stock: stock ? JSON.parse(stock) : requestedProduct.stock,
            }
            let modifiedList = await productList.modify(requestedProduct)
            res.send(modifiedList)
        })
        .delete(async (req, res) => {
            let newProductList = await productList.deleteById(parseInt(req.params.id))
            res.send(newProductList)
        })
}

router
    .use((req, res, next) => {
        const err = new Error('Forbidden')
        err.status = 403
        err.message = `Forbidden method:${req.method} in route:${req.originalUrl}`
        next(err)
    })

exports.router = router