const router = require('express').Router();
const Container = require('../DB/Container.js')

// let productList = [
//     {
//         "title": "Escuadra",
//         "price": 123.45,
//         "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//         "id": 1
//     },
//     {
//         "title": "Calculadora",
//         "price": 234.56,
//         "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//         "id": 2
//     },
//     {
//         "title": "Globo Terráqueo",
//         "price": 345.67,
//         "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//         "id": 3
//     }
// ]

const productsSQL = new Container('products', {client: 'mysql', connection: {host: 'localhost', user: 'root', password: 'root', database: 'products'}})

router
    .route('/')
    .get(async (req, res) => {
        const productList = await productsSQL.getAll()
        res.render('data', { productList })
    })
    .post(async (req, res) => {
        const { title, price, thumbnail } = req.body
        let newProduct = {
            title: title,
            price: JSON.parse(price),
            thumbnail: thumbnail,
        }
        await productsSQL.insert(newProduct)
        try {
            return res.send(await productsSQL.getAll())
        }
        catch(err) {
            console.log(err);
        }
    });

router
    .route('/:id')
    .get(async (req, res) => {
        const requestedProduct = await productsSQL.getById(parseInt(req.params.id))
        try {
            return res.send(requestedProduct)
        }
        catch (err) {
            console.log(err)
        }
    })
    .put(async (req, res) => {
        const newProduct = {
            title: req.body.title,
            price: JSON.parse(req.body.price),
            thumbnail: req.body.thumbnail,
        }
        await productsSQL.update(newProduct, parseInt(req.params.id))
        try {
            return res.send(await productsSQL.getAll())
        }
        catch(err) {
            console.log(err);
        }
    })
    .delete(async (req, res) => {
        await productsSQL.deleteById(parseInt(req.params.id))
        try {
            return res.send(await productsSQL.getAll())
        }
        catch (err) {
            console.log(err);
        }
    })

exports.router = router