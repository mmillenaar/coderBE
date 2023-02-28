import FirebaseContainer from "../../../containers/firebase.container.js.js";
import { asProductsDto } from "../../DTOs/product.dto.js";

export default class FirebaseProductsDao extends FirebaseContainer {
    constructor() {
        super('products')
    }

    async getAllProducts() {
        const allContent = await super.getAll()
        return asProductsDto(allContent)
    }
    async getProductById(id) {
        const requestedProduct = await super.getById(id)
        return asProductsDto(requestedProduct)
    }
    async saveProduct(product) {
        const savedProduct = await super.saveObject(product)
        return asProductsDto(savedProduct)
    }
    async modifyProduct(product) {
        const modifiedProduct = await super.modifyObject(product)
        return asProductsDto(modifiedProduct)
    }
    async deleteProductById(id) {
        const newProductsList = await super.deleteById(id)
        return asProductsDto(newProductsList)
    }
}