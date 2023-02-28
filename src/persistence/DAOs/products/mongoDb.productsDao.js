import MongoDbContainer from "../../containers/mongoDb.container.js";
import productsSchema from "../../../models/products.schema.js";
import { asProductsDto } from "../../DTOs/product.dto.js";

export default class MongoDbProductsDao extends MongoDbContainer {
    constructor() {
        super('products', productsSchema)
    }

    async getAllProducts() {
        const allContent = await this.getAll()
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