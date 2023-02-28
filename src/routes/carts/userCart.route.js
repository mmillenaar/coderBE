import express from 'express'
import { getFinishOrder, getUserCart, postUserCart } from '../../controllers/carts.controller.js'
const { Router } = express

const userCartRouter = new Router()
userCartRouter
    .route('/')
    .get(getUserCart)
    .post(postUserCart)

userCartRouter
    .route('/finish-order')
    .get(getFinishOrder)

export default userCartRouter