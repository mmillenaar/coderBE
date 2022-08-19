const router = require('express').Router();

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
    return JSON.stringify(productList[productList.length -1])
}

const getById = (id) => {
    const filteredProduct = productList.filter(object => object.id === id)
    if (filteredProduct.length === 0) {
        return { error: 'Product not found' }
    }
    else {
        return filteredProduct[0]
    }
}

const deleteById = (id) => {
    const filteredList = productList.filter(object => object.id !== id)
    if (filteredList.length == productList.length) {
        return { error: 'Product not found' }
    } else {
        productList = filteredList
        return `Product successfully deleted, your updated product list is: ${JSON.stringify(productList)}`
    }
}

const deleteAll = () => {
    productList = []
    return { success: 'All products have been deleted' }
}


router.get('/', (req, res) => {
    res.send(productList)
})

router.get('/:id', (req, res) => {
    let requestedProduct = getById(parseInt(req.params.id))
    res.send(requestedProduct)
})

router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body
    let newProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail,
    }
    let newProductWithId = save(newProduct)
    res.send(newProductWithId)
})

router.put('/:id', (req, res) => {
    let requestedProduct = getById(parseInt(req.params.id))
    const { title, price, thumbnail } = req.body
    let modifiedProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: requestedProduct.id
    }
    res.send(`Product ${JSON.stringify(modifiedProduct)} successfully saved`)
})

router.delete('/:id', (req, res) => {
    let newProductList = deleteById(parseInt(req.params.id))
    res.send(newProductList)
})

module.exports = router