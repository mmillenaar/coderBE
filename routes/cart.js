const router = require('express').Router();

let cartList = [
    {
        id: 1,
        timestamp: 1662654279342,
        cart: [
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
        ],
    }
]

const saveCart = (cart) => {
    let newId
    if (cartList.length === 0) {
        newId = 1
    }
    else {
        const lastId = cartList[cartList.length - 1].id
        newId = lastId + 1
    }
    cartList.push({id: newId, timestamp: Date.now(), ...cart})
    return newId
}
const deleteById = (array, id) => {
    const filteredList = array.filter(element => element.id !== id)
    if (filteredList.length == array.length) {
        throw new Error(`DELETE: id:${id} not found in ${JSON.stringify(array)}`)
    } else {
        array.length = 0
        filteredList.map(element => array.push(element))
        return array
    }
}
const getById = (array, id) => {
    let searchedIndex = array.findIndex(element => element.id == id)
    if (searchedIndex < 0) {
        throw new Error(`GET: id:${id} not found in ${JSON.stringify(array)}`)
    }
    else {
        return searchedIndex
    }
}

router
    .route('/')
    .post((req, res) => {
        const { products } = req.body
        let newCart = {
            cart: JSON.parse(products)
        }
        const newCartId = saveCart(newCart)
        res.send(JSON.stringify(newCartId))
    })

router
    .route('/:id')
    .delete((req, res) => {
        let newCartList = deleteById(cartList, parseInt(req.params.id))
        res.send(newCartList)
    })

router
    .route('/:id/products')
    .get((req, res) => {
        let requestedCartIndex = getById(cartList, parseInt(req.params.id))
        res.send(cartList[requestedCartIndex].cart)
    })
    .post((req, res) => {
        const { products } = req.body
        const parsedProducts = JSON.parse(products)
        let requestedCartIndex = getById(cartList, parseInt(req.params.id))
        parsedProducts.map(product => {
            cartList[requestedCartIndex].cart.push(product)
        })
        cartList[requestedCartIndex].timestamp = Date.now()
        res.send(cartList[requestedCartIndex])
    })

router
    .route('/:id/products/:id_prod')
    .delete((req, res) => {
        let requestedCartIndex = getById(cartList, parseInt(req.params.id))
        let newCart = deleteById(cartList[requestedCartIndex].cart, parseInt(req.params.id_prod))
        cartList[requestedCartIndex].timestamp = Date.now()
        res.send(newCart)
    })

exports.router = router