const router = express.Router()

let productList = []

const save = (product) => {
    let newId
    if (productList.length == 0) {
        newId = 1
    } else {
        const lastId = productList[productList.length - 1].id
        newId = lastId + 1
    }
    productList.push({ id: newId, ...product })
    return productList[productList.length -1]
}

const getById = (id) => {
    const filteredProduct = productList.filter(object => object.id === id)
    if (filteredProduct.length === 0) {
        return { error: 'Product not found' }
    }
    else {
        return filteredProduct
    }
}

const deleteById = (id) => {
    const filteredList = productList.filter(object => object.id !== id)
    if (filteredList.length = productList.length) {
        return { error: 'Product not found' }
    } else {
        productList = filteredList
    }
    return productList
}

const deleteAll = () => {
    productList = []
    return { success: 'All products have been deleted' }
}


router.get('/', (req, res) => {
    res.send(productList)
})

router.get('/:id', (req, res) => {
    let requestedProduct = productList.getById(parseInt(req.params.id))
    res.send(requestedProduct)
})

router.post('/', (req, res) => {
    let newProduct // TODO: define variable
    let newProductWithId = productList.save(newProduct)
    res.send(newProductWithId)
})

router.put('/:id', (req, res) => {
    let modifiedProduct // TODO: define variable
    let requestedProduct = productList.getById(parseInt(req.params.id))
    requestedProduct = modifiedProduct
    res.send(`Product ${requestedProduct} successfully saved`)
})

// app.delete('/api/products/:id', async (req, res) => {
//     try {
//         await productList.deleteById(parseInt(req.params.id))
//         res.send(`Product with Id:${req.params.id} successfully deleted`)
//     }
//     catch (err) {
//         console.error(err);
//     }
// })