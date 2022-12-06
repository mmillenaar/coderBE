import express from 'express'
const { Router } = express
import authValidator from '../../middlewares/auth.middleware.js'
import { deleteProduct, getProducts, postProduct, putProduct } from '../../controllers/products.controller.js'

let isAdmin = true

const productsRouter = new Router()
productsRouter
    .route('/:id?')
    .get(getProducts)
productsRouter
    .route('/')
    .post(authValidator(isAdmin), postProduct)
productsRouter
    .route('/:id')
    .put(authValidator(isAdmin), putProduct)
    .delete(authValidator(isAdmin), deleteProduct)

export default productsRouter