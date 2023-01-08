import { Router } from "express"
import { deleteProduct, getProduct, getProducts, postProducts, putProduct } from "../../controllers/products.controller.js"

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
    .get(getProducts)
    .post(validate, postProducts)

productsApiRouter
    .route('/:id')
    .get(getProduct)
    .put(validate, putProduct)
    .delete(deleteProduct)

export default productsApiRouter