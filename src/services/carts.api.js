import FactoryDao from "../persistence/factory.js";
import { sendMailOnFinishOrder } from "../utils/sendMails.js";
import { sendSMSOnFinishOrder, sendWPOnFinishOrder } from "../utils/sendMessages.js";
import productsApi from "./products.api.js";
import usersApi from "./users.api.js";

const cartsApi = FactoryDao.getCartsDao()

cartsApi.postCart = async (cart) => {
    const { products } = cart
    if (products) {
        let newCartProducts = {
            cart: JSON.parse(products)
        }
        const newCart = await cartsApi.saveObject(newCartProducts)
        return newCart
    }
    else {
        throw new Error('Cart products information missing')
    }
}
cartsApi.postCartProducts = async (id, modifiedCart) => {
    const { products } = modifiedCart
    let requestedCart = await cartsApi.getById(id)
    requestedCart.cart = []
    JSON.parse(products).map(product => {
        requestedCart.cart.push(product)
    })
    requestedCart.timestamp = Date.now()
    const newCartProducts  = await cartsApi.modifyObject(requestedCart)
    return newCartProducts
}
cartsApi.deleteProductFromCart = async (cartId, productId) => {
    let requestedCart = await cartsApi.getById(cartId)
    const filteredProducts = requestedCart.cart.filter(element => element.id != productId)
    requestedCart.cart = []
    filteredProducts.map(element => requestedCart.cart.push(element))
    requestedCart.timestamp = Date.now()
    const newCartProducts  = await cartsApi.modifyObject(requestedCart)
    return newCartProducts
}
cartsApi.handlePostUserCart = async (userEmail, productId, newProductQuantity) => {
    const user = await usersApi.getRawUserByEmail(userEmail)
    const { stock, ...product } = await productsApi.getProductById(productId)
    const productIndex = user.cart.products.findIndex(element => element.id === product.id)
    product.quantity = JSON.parse(newProductQuantity)
    product.timestamp = Date.now()
    if (productIndex >= 0) {
        // -> update product stock in DB
        product.stock = stock + user.cart.products[productIndex].quantity - newProductQuantity
        // -> update user cart
        user.cart.products[productIndex] = product
    }
    else {
        // -> update product stock in DB
        product.stock = stock - newProductQuantity
        // -> update  user cart
        user.cart.products.push(product)
    }
    await productsApi.putProduct(productId, product)
    await usersApi.updateUser(user)
}
cartsApi.finishOrder = async (user) => {
    await sendMailOnFinishOrder(user)
    let userPhoneNumber = `+${user.countryCode}${user.phone}`
    await sendSMSOnFinishOrder(userPhoneNumber)
    await sendWPOnFinishOrder(user)
    const { cart, ...modifiedUser } = user
    modifiedUser.cart = {
        timestamp: Date.now(),
        products: []
    }
    await usersApi.updateUser(modifiedUser)
}

export default cartsApi