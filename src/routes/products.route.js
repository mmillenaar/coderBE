import express from 'express'
const { Router } = express
import { productsDao as productsApi } from '../DAOs/daosIndex.js'

let isAdmin = true

const productsRouter = new Router()

productsRouter
    .route('/:id?')
    .get(async (req, res) => {
        if (req.params.id) {
            res.send(await productsApi.getProductById(req.params.id))
        }
        else {
            res.send(await productsApi.getAllProducts())
        }
    })

if (isAdmin) {
    productsRouter
        .route('/')
        .post(async (req, res) => {
            res.send(await productsApi.saveProduct(req.body))
        })
    productsRouter
        .route('/:id')
        .put(async (req, res) => {
            res.send(await productsApi.modifyProduct(req.params.id, req.body))
        })
        .delete(async (req, res) => {
            res.send(await productsApi.deleteProductById(req.params.id))
        })
}

productsRouter
    .use((req, res, next) => {
        const err = new Error('Unauthorized')
        err.status = 401
        err.message = `Unauthorized method:${req.method} in route:${req.originalUrl}`
        next(err)
    })

export default productsRouter