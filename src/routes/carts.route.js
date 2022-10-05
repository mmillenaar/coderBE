import express from 'express'
const { Router } = express
import { cartsDao as cartsApi } from '../DAOs/daosIndex.js'

const cartsRouter = new Router()

cartsRouter
    .route('/')
    .get(async (req, res) => {
        res.send(await cartsApi.getAllCarts())
    })
    .post(async (req, res) => {
        res.send(await cartsApi.saveCart(req.body))
    })

cartsRouter
    .route('/:id')
    .delete(async (req, res) => {
        res.send(await cartsApi.deleteCartById(req.params.id))
    })

cartsRouter
    .route('/:id/products')
    .get(async (req, res) => {
        res.send((await cartsApi.getCartById(req.params.id)).cart)
    })
    .post(async (req, res) => {
        res.send(await cartsApi.modifyCart(req.params.id, req.body))
    })

cartsRouter
    .route('/:id/products/:id_prod')
    .delete(async (req, res) => {
        res.send(await cartsApi.deleteProductFromCart(req.params.id, req.params.id_prod))
    })

export default cartsRouter