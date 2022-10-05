import MongoDbContainer from "../../containers/mongoDb.container.js";
import productsSchema from "../../models/products.schema.js";

export default class MongoDbProductsDao extends MongoDbContainer {
    constructor() {
        super('products', productsSchema)
    }

    async getAllProducts() {
        const allContent = await this.getAll()
        return allContent
    }

    async getProductById(id) {
        const requestedProduct = super.getById(id)
        return requestedProduct
    }

    async saveProduct(product) {
        const { title, description, code, thumbnail, price, stock } = product
        let newProduct = {
            title: title,
            description: description,
            code: code,
            thumbnail: thumbnail,
            price: JSON.parse(price),
            stock: JSON.parse(stock)
        }
        let newList = await super.saveObject(newProduct)
        return newList
    }

    async modifyProduct(id, modifiedProduct) {
        let requestedProduct = await super.getById(id)
        const { title, description, code, thumbnail, price, stock } = modifiedProduct
        requestedProduct = {
            id: requestedProduct.id,
            timestamp: Date.now(),
            title: title ? title : requestedProduct.title,
            description: description ? description : requestedProduct.description,
            code: code ? code : requestedProduct.code,
            thumbnail: thumbnail ? thumbnail : requestedProduct.thumbnail,
            price: price ? JSON.parse(price) : requestedProduct.price,
            stock: stock ? JSON.parse(stock) : requestedProduct.stock,
        }
        let modifiedList = await super.modifyObject(requestedProduct)
        return modifiedList
    }

    async deleteProductById(id) {
        let newProductsList = super.deleteById(id)
        return newProductsList
    }
}