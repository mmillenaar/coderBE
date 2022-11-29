import { cartsDao as cartsApi } from "../DAOs/daosIndex.js";

export const getCarts = async (next, req, res) => {
    try {
        res.send(await cartsApi.getAllCarts())
    }
    catch (err) {
        next(err)
    }
}
export const postCart = async (next, req, res) => {
    try {
        res.send(await cartsApi.saveCart(req.body))
    }
    catch (err) {
        next(err)
    }
}
export const deleteCart = async (next, req, res) => {
    try {
        res.send(await cartsApi.deleteCartById(req.params.id))
    }
    catch (err) {
        next(err)
    }
}
export const getCartProducts = async (next, req, res) => {
    try {
        res.send((await cartsApi.getCartById(req.params.id)).cart)
    }
    catch (err) {
        next(err)
    }
}
export const postCartProducts = async (next, req, res) => {
    try {
        res.send(await cartsApi.modifyCart(req.params.id, req.body))
    }
    catch (err) {
        next(err)
    }
}
export const deleteCartProduct = async (next, req, res) => {
    try {
        res.send(await cartsApi.deleteProductFromCart(req.params.id, req.params.id_prod))
    }
    catch (err) {
        next(err)
    }
}