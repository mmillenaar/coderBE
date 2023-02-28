import FsContainer from "../../containers/fs.container.js";
import { asCartsDto } from "../../DTOs/carts.dto.js";

export default class FsCartsDao extends FsContainer {
    constructor() {
        super('carts.json')
    }

    async getAllCarts() {
        const allContent = await super.getAll()
        return asCartsDto(allContent)
    }
    async getCartById(id) {
        const requestedCart = await super.getById(id)
        return asCartsDto(requestedCart)
    }
    async saveCart(cart) {
        const savedCart = await super.saveObject(cart)
        return asCartsDto(savedCart)
    }
    async modifyCart(cart) {
        const modifiedCart = await super.modifyObject(cart)
        return asCartsDto(modifiedCart)
    }
    async deleteCartById(id) {
        const newCartsList = await super.deleteById(id)
        return asCartsDto(newCartsList)
    }
}