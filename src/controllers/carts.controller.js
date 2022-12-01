import path from "path";
import { cartsDao as cartsApi } from "../DAOs/daosIndex.js";
import { usersDao as usersApi } from "../DAOs/daosIndex.js";
import { productsDao as productsApi } from "../DAOs/daosIndex.js"

export const getCarts = async (req, res, next) => {
    try {
        res.send(await cartsApi.getAllCarts())
    }
    catch (err) {
        next(err)
    }
}
export const postCart = async (req, res, next) => {
    try {
        res.send(await cartsApi.saveCart(req.body))
    }
    catch (err) {
        next(err)
    }
}
export const deleteCart = async (req, res, next) => {
    try {
        res.send(await cartsApi.deleteCartById(req.params.id))
    }
    catch (err) {
        next(err)
    }
}
export const getCartProducts = async (req, res, next) => {
    try {
        res.send((await cartsApi.getCartById(req.params.id)).cart)
    }
    catch (err) {
        next(err)
    }
}
export const postCartProducts = async (req, res, next) => {
    try {
        res.send(await cartsApi.modifyCart(req.params.id, req.body))
    }
    catch (err) {
        next(err)
    }
}
export const deleteCartProduct = async (req, res, next) => {
    try {
        res.send(await cartsApi.deleteProductFromCart(req.params.id, req.params.id_prod))
    }
    catch (err) {
        next(err)
    }
}
export const postUserCart = async (req, res, next) => {
    try {

        //TODO: sumar cantidad en vez de updatear? ver como restar en otra vista

        let user = await usersApi.getUserByEmail(req.user.email)
        const requestedProduct = await productsApi.getProductById(req.body.productId)
        const { stock, ...newCartProduct } = requestedProduct
        newCartProduct.quantity = JSON.parse(req.body.quantity)
        newCartProduct.timestamp = Date.now()
        const newCartProductId = newCartProduct._id.toHexString()

        const productIndex = user.cart.products.findIndex(element => element.id === newCartProductId)
        if (productIndex >= 0) {
            // update product stock in DB
            const oldQuantity = user.cart.products[productIndex].quantity
            requestedProduct.stock = requestedProduct.stock + oldQuantity - newCartProduct.quantity
            await productsApi.modifyProduct(req.body.productId, requestedProduct)
            // update existing product values in cart
            user.cart.products[productIndex] = newCartProduct
        }
        else {
            // update product stock in DB
            requestedProduct.stock = requestedProduct.stock - newCartProduct.quantity
            await productsApi.modifyProduct(req.body.productId, requestedProduct)
            // add product to user's cart
            user.cart.products.push(newCartProduct)
        }
        await usersApi.updateUser(user)

        res.sendFile(path.resolve('./views/pages/updatedCart.html'))
    }
    catch (err) {
        next(err)
    }
}