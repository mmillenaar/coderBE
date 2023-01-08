import productsSchema from "../../models/products.schema.js";
import MongoDbContainer from "../containers/mongodb.container.js";
import { asProductsDto } from "../DTOS/product.dto.js";

class ProductsDao extends MongoDbContainer {
    constructor() {
        super('products', productsSchema)
    }

    async getAll() {
        return asProductsDto(await super.getAll())
    }
    async getById(id) {
        return asProductsDto(await super.getById(id))
    }
    async getElementByValue(field, value) {
        return asProductsDto(await super.getElementByValue(field, value))
    }
}

export default ProductsDao