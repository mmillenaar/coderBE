const router = require('express').Router();

let isAdmin = true
let productList = [
    {
        "id": 1,
        "timestamp": 1662654279342,
        "title": "Escuadra",
        "description": "aaa",
        "code": "a",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "price": 123.45,
        "stock": 10
    },
    {
        "id": 2,
        "timestamp": 1662654279342,
        "title": "Calculadora",
        "description": "bbb",
        "code": "b",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "price": 234.56,
        "stock": 10
    },
    {
        "id": 3,
        "timestamp": 1662654279342,
        "title": "Globo Terráqueo",
        "description": "ccc",
        "code": "c",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "price": 345.67,
        "stock": 10
    }
]

const save = (product) => {
    let newId
    if (productList.length == 0) {
        newId = 1
    } else {
        const lastId = productList[productList.length - 1].id
        newId = lastId + 1
    }
    productList.push({id: newId, timestamp: Date.now(), ...product})
    return productList
}
const getById = (id) => {
    let productIndex = productList.findIndex(element => element.id == id)
    if (productIndex < 0) {
        throw new Error(`Product not found`)
    }
    else {
        return productIndex
    }
}
const deleteById = (id) => {
    const filteredList = productList.filter(element => element.id !== id)
    if (filteredList.length == productList.length) {
        throw new Error(`Product not found`)
    } else {
        productList = filteredList
        return productList
    }
}

router
    .route('/:id?')
    .get((req, res) => {
        if (req.params.id) {
            let requestedProductIndex = getById(parseInt(req.params.id))
            //TODO: JSON.stringify all
            res.send(productList[requestedProductIndex])
        }
        else {
            res.send(productList)
        }
    })

if (isAdmin) {
    router
        .route('/')
        .post((req, res) => {
            const { title, description, code, thumbnail, price, stock } = req.body
            let newProduct = {
                title: title,
                description: description,
                code: code,
                thumbnail: thumbnail,
                price: JSON.parse(price),
                stock: JSON.parse(stock)
            }
            save(newProduct)
            res.send(productList)
        })
    router
        .route('/:id')
        .put((req, res) => {
            let requestedProductIndex = getById(parseInt(req.params.id))
            const { title, description, code, thumbnail, price, stock } = req.body
            productList[requestedProductIndex] = {
                id: productList[requestedProductIndex].id,
                timestamp: Date.now(),
                title: title ? title : productList[requestedProductIndex].title,
                description: description ? description : productList[requestedProductIndex].description,
                code: code ? code : productList[requestedProductIndex].code,
                thumbnail: thumbnail ? thumbnail : productList[requestedProductIndex].thumbnail,
                price: price ? JSON.parse(price) : productList[requestedProductIndex].price,
                stock: stock ? JSON.parse(stock) : productList[requestedProductIndex].stock,
            }
            res.send(productList)
        })
        .delete((req, res) => {
            let newProductList = deleteById(parseInt(req.params.id))
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

module.exports.router = router