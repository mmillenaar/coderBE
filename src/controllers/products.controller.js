import productsApi from "../services/products.api.js"

export const getProducts = async (req, res) => {
    const products = await productsApi.getAll()
    return res.json(products)
}
export const postProducts = async (req, res) => {
    const { title, price, thumbnail } = req.body
    let newProduct = {
        title: title,
        price: JSON.parse(price),
        thumbnail: thumbnail,
    }
    await productsApi.save(newProduct)
    return res.json(await productsApi.getAll())
}
export const getProduct = async (req, res) => {
    const requestedProduct = await productsApi.getById(req.params.id)
    return res.json(requestedProduct)
}
export const putProduct = async (req, res) => {
    const modifiedProduct = {
        title: req.body.title,
        price: JSON.parse(req.body.price),
        thumbnail: req.body.thumbnail,
    }
    await productsApi.update(modifiedProduct, req.params.id)
    return res.json(await productsApi.getAll())
}
export const deleteProduct = async (req, res) => {
    await productsApi.deleteById(req.params.id)
    return res.send(await productsApi.getAll())
}