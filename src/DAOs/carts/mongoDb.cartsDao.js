import logger from "../../config/logger.config.js";
import MongoDbContainer from "../../containers/mongoDb.container.js";
import cartsSchema from "../../models/carts.schema.js";

export default class MongoDbCartsDao extends MongoDbContainer {
    constructor() {
        super('carts', cartsSchema)
    }

    async getAllCarts() {
        const allContent = await super.getAll()
        return allContent
    }
    async getCartById(id) {
        const requestedCart = await super.getById(id)
        return requestedCart
    }
    async saveCart(cart) {
        try {
            const { products } = cart
            if (products) {
                let newCartProducts = {
                    products: JSON.parse(products)
                }
                const newCart = await super.saveObject(newCartProducts)
                return newCart
            }
            else {
                throw new Error('Cart products information missing')
            }
        }
        catch (err) {
            err.status = 400
            logger.error(err)
            throw err
        }
    }
    async modifyCart(id, modifiedCart) {
        const { products } = modifiedCart
        let requestedCart = await super.getById(id)
        JSON.parse(products).map(product => {
            requestedCart.products.push(product)
        })
        requestedCart.timestamp = Date.now()
        const newCartProducts  = await super.modifyObject(requestedCart)
        return newCartProducts
    }
    async deleteCartById(id) {
        let newCartsList = await super.deleteById(id)
        return newCartsList
    }
    async deleteProductFromCart(cartId, productId) {
        let requestedCart = await super.getById(cartId)
        let filteredProducts = requestedCart.products.filter(element => element.id !== productId)
        requestedCart.products.length = 0
        filteredProducts.map(element => requestedCart.products.push(element))
        requestedCart.timestamp = Date.now()
        const newCartProducts  = await super.modifyObject(requestedCart)
        return newCartProducts
    }
}