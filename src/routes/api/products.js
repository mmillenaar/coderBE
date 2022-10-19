import { Router } from "express"
import productsApi from "../../api/products.api.js"

const validate = (req, res, next) => {
    if (req.body.title && req.body.price > 0 && req.body.thumbnail) {
        next()
    }
    else {
        throw new Error('Error: Data not accepted')
    }
}

const productsApiRouter = new Router()

productsApiRouter
    .route('/')
    .get(async (req, res) => {
        const productList = await productsApi.getAll()
        res.send(productList)
    })
    .post(validate, async (req, res) => {
        const { title, price, thumbnail } = req.body
        let newProduct = {
            title: title,
            price: JSON.parse(price),
            thumbnail: thumbnail,
        }
        await productsApi.save(newProduct)
        try {
            return res.send(await productsApi.getAll())
        }
        catch(err) {
            console.log(err);
        }
    });

productsApiRouter
    .route('/:id')
    .get(async (req, res) => {
        const requestedProduct = await productsApi.getById(parseInt(req.params.id))
        try {
            return res.send(requestedProduct)
        }
        catch (err) {
            console.log(err)
        }
    })
    .put(validate, async (req, res) => {
        const modifiedProduct = {
            title: req.body.title,
            price: JSON.parse(req.body.price),
            thumbnail: req.body.thumbnail,
        }
        await productsApi.update(modifiedProduct, JSON.parse(req.params.id))
        try {
            return res.send(await productsApi.getAll())
        }
        catch(err) {
            console.log(err);
        }
    })
    .delete(async (req, res) => {
        await productsApi.deleteById(parseInt(req.params.id))
        try {
            return res.send(await productsApi.getAll())
        }
        catch (err) {
            console.log(err);
        }
    })

export default productsApiRouter
export { productsApi }