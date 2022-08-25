const router = require('express').Router();

let emptyList
let productList = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
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
    productList.push({...product, id: newId})
    return productList
}
const getById = (id) => {
    let productIndex = productList.findIndex(element => element.id == id)
    if (productIndex < 0) {
        return { error: 'Product not found' }
    }
    else {
        return productIndex
    }
}
const deleteById = (id) => {
    const filteredList = productList.filter(object => object.id !== id)
    if (filteredList.length == productList.length) {
        return { error: 'Product not found' }
    } else {
        productList = filteredList
        return `Product successfully deleted, your updated product consists of: ${JSON.stringify(productList)}`
    }
}
const deleteAll = () => {
    productList = []
    return { success: 'All products have been deleted' }
}


router
    .route('/')
    .get((req, res) => {
        if (productList.length === 0) {
            emptyList = true
        }
        res.render('pages/data', {productList, emptyList})
    })
    .post((req, res) => {
        const { title, price, thumbnail } = req.body
        let newProduct = {
            title: title,
            price: price,
            thumbnail: thumbnail,
        }
        save(newProduct)
        res.render('pages/data', { productList, emptyList: false })
    });

router
    .route('/:id')
    .get((req, res) => {
        let requestedProductIndex = getById(parseInt(req.params.id))
        res.send(productList[requestedProductIndex])
    })
    .put((req, res) => {
        let requestedProductIndex = getById(parseInt(req.params.id))
        const newTitle = req.body.title
        const newPrice = req.body.price
        const newThumbnail = req.body.thumbnail
        productList[requestedProductIndex] = {
            title: newTitle && newTitle,
            price: newPrice && newPrice,
            thumbnail: newThumbnail && newThumbnail,
            id: productList[requestedProductIndex].id
        }
        res.send(`Changes saved. Your updated product list consists of: ${JSON.stringify(productList)}`)
    })
    .delete((req, res) => {
        let newProductList = deleteById(parseInt(req.params.id))
        res.send(newProductList)
    })

module.exports = router