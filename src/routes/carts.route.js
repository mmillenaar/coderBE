import express from 'express'
const { Router } = express
import { cartsDao as cartsApi } from '../DAOs/daosIndex.js'

const cartsRouter = new Router()
cartsRouter
    .route('/')
    .get(async (next, req, res) => {
        try {
            res.send(await cartsApi.getAllCarts())
        }
        catch (err) {
            next(err)
        }
    })
    .post(async (next, req, res) => {
        try {
            res.send(await cartsApi.saveCart(req.body))
        }
        catch (err) {
            next(err)
        }
    })
cartsRouter
    .route('/:id')
    .delete(async (next, req, res) => {
        try {
            res.send(await cartsApi.deleteCartById(req.params.id))
        }
        catch (err) {
            next(err)
        }
    })
cartsRouter
    .route('/:id/products')
    .get(async (next, req, res) => {
        try {
            res.send((await cartsApi.getCartById(req.params.id)).cart)
        }
        catch (err) {
            next(err)
        }
    })
    .post(async (next, req, res) => {
        try {
            res.send(await cartsApi.modifyCart(req.params.id, req.body))
        }
        catch (err) {
            next(err)
        }
    })
cartsRouter
    .route('/:id/products/:id_prod')
    .delete(async (next, req, res) => {
        try {
            res.send(await cartsApi.deleteProductFromCart(req.params.id, req.params.id_prod))
        }
        catch (err) {
            next(err)
        }
    })

export default cartsRouter