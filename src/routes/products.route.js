import express from 'express'
const { Router } = express
import { productsDao as productsApi } from '../DAOs/daosIndex.js'
import authValidator from '../middlewares/auth.middleware.js'

let isAdmin = true

const productsRouter = new Router()
productsRouter
    .route('/:id?')
    .get(async (req, res, next) => {
        try {
            if (req.params.id) {
                res.send(await productsApi.getProductById(req.params.id))
            }
            else {
                res.send(await productsApi.getAllProducts())
            }
        }
        catch (err) {
            next(err)
        }
    })
productsRouter
    .route('/')
    .post(authValidator(isAdmin), async (req, res, next) => {
        try {
            res.send(await productsApi.saveProduct(req.body))
        }
        catch (err) {
            next(err)
        }
    })
productsRouter
    .route('/:id')
    .put(authValidator(isAdmin), async (req, res, next) => {
        try {
            res.send(await productsApi.modifyProduct(req.params.id, req.body))
        }
        catch (err) {
            next(err)
        }
    })
    .delete(authValidator(isAdmin), async (req, res, next) => {
        try {
            res.send(await productsApi.deleteProductById(req.params.id))
        }
        catch (err) {
            next(err)
        }
    })

export default productsRouter