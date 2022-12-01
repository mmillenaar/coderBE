import express from 'express'
import { postUserCart } from '../../controllers/carts.controller.js'
const { Router } = express

const userCartRouter = new Router()
userCartRouter
    .route('/')
    .post(postUserCart)

export default userCartRouter