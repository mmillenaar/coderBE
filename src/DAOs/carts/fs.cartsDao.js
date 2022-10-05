import FsContainer from "../../containers/fs.container.js";

export default class FsCartsDao extends FsContainer {
    constructor() {
        super('carts.json')
    }

    async getAllCarts() {
        const allContent = await super.getAll()
        return allContent
    }
    async getCartById(id) {
        const requestedCart = await super.getById(parseInt(id))
        return requestedCart
    }
    async saveCart(cart) {
        const { products } = cart
        let newCartProducts = {
            cart: JSON.parse(products)
        }
        const newCart = await super.saveObject(newCartProducts)
        return newCart
    }
    async modifyCart(id, modifiedCart) {
        const { products } = modifiedCart
        let requestedCart = await super.getById(parseInt(id))
        JSON.parse(products).map(product => {
            requestedCart.cart.push(product)
        })
        requestedCart.timestamp = Date.now()
        const newCartProducts  = await super.modifyObject(requestedCart)
        return newCartProducts
    }
    async deleteCartById(id) {
        let newCartsList = await super.deleteById(parseInt(id))
        return newCartsList
    }
    async deleteProductFromCart(cartId, productId) {
        let requestedCart = await super.getById(parseInt(cartId))
        let filteredProducts = requestedCart.cart.filter(element => element.id !== parseInt(productId))
        requestedCart.cart.length = 0
        filteredProducts.map(element => requestedCart.cart.push(element))
        requestedCart.timestamp = Date.now()
        const newCartProducts  = await super.modifyObject(requestedCart)
        return newCartProducts
    }
}