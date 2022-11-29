import path from 'path'
import { productsDao as productsApi } from "../DAOs/daosIndex.js"

export const getProducts = async (req, res, next) => {
    try {
        if (req.params.id) {
            const product = await productsApi.getProductById(req.params.id)
            res.render(path.resolve('./views/pages/product.handlebars'), product)
        }
        else {
            const allProducts = await productsApi.getAllProducts()
            res.render(path.resolve('./views/pages/allProducts.handlebars'), {allProducts})
        }
    }
    catch (err) {
        next(err)
    }
}
export const postProduct = async (req, res, next) => {
    try {
        res.send(await productsApi.saveProduct(req.body))
    }
    catch (err) {
        next(err)
    }
}
export const putProduct = async (req, res, next) => {
    try {
        res.send(await productsApi.modifyProduct(req.params.id, req.body))
    }
    catch (err) {
        next(err)
    }
}
export const deleteProduct = async (req, res, next) => {
    try {
        res.send(await productsApi.deleteProductById(req.params.id))
    }
    catch (err) {
        next(err)
    }
}