import path from "path";
import cartsApi from "../services/carts.api.js";
import usersApi from "../services/users.api.js";
import logger from "../config/logger.config.js";

export const getCarts = async (req, res, next) => {
    try {
        res.send(await cartsApi.getAllCarts())
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const postCart = async (req, res, next) => {
    try {
        res.send(await cartsApi.postCart(req.body))
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const deleteCart = async (req, res, next) => {
    try {
        res.send(await cartsApi.deleteCartById(req.params.id))
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const getCartProducts = async (req, res, next) => {
    try {
        res.send((await cartsApi.getCartById(req.params.id)).cart)
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const postCartProducts = async (req, res, next) => {
    try {
        res.send(await cartsApi.postCartProducts(req.params.id, req.body))
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const deleteCartProduct = async (req, res, next) => {
    try {
        res.send(await cartsApi.deleteProductFromCart(req.params.id, req.params.id_prod))
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const getUserCart = async (req, res, next) => {
    try {
        const user = await usersApi.getUserByEmail(req.user.email)
        const userCart = user.cart.products
        res.render(path.resolve('./views/pages/userCart.handlebars'), { userCart })
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const postUserCart = async (req, res, next) => {
    try {
        await cartsApi.handlePostUserCart(req.user.email, req.body.productId, req.body.quantity)
        res.sendFile(path.resolve('./views/pages/updatedCart.html'))
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}
export const getFinishOrder = async (req, res, next) => {
    try {
        const user = await usersApi.getRawUserByEmail(req.user.email)
        await cartsApi.finishOrder(user)
        res.sendFile(path.resolve('./views/pages/finishedOrder.html'))
    }
    catch (err) {
        logger.error(err)
        next(err)
    }
}