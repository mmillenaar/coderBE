import FactoryDao from "../persistence/factory.js";

const productsApi = FactoryDao.getProductsDao()

productsApi.postProduct = async (product) => {
    const { title, description, code, thumbnail, price, stock } = product
    if (title && price && stock) {
        let newProduct = {
            title: title,
            description: description ? description : '',
            code: code ? code : '',
            thumbnail: thumbnail ? thumbnail : '',
            price: JSON.parse(price),
            stock: JSON.parse(stock)
        }
        const newSavedProduct = await productsApi.saveProduct(newProduct)
        return newSavedProduct
    }
}
productsApi.putProduct = async (id, modifiedProduct) => {
    let requestedProduct = await productsApi.getProductById(id)
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
    const newModifiedProduct = await productsApi.modifyProduct(requestedProduct)
    return newModifiedProduct
}

export default productsApi