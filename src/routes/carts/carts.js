import express from 'express'
const { Router } = express
import { deleteCart, deleteCartProduct, getCartProducts, getCarts, postCart, postCartProducts } from '../../controllers/carts.controller.js'

const cartsRouter = new Router()
cartsRouter
    .route('/')
    .get(getCarts)
    .post(postCart)
cartsRouter
    .route('/:id')
    .delete(deleteCart)
cartsRouter
    .route('/:id/products')
    .get(getCartProducts)
    .post(postCartProducts)
cartsRouter
    .route('/:id/products/:id_prod')
    .delete(deleteCartProduct)

export default cartsRouter