import productsApi from "../../services/products.api.js"

export default async function socketProductsConfiguration(socket, sockets) {
    const productsData = await productsApi.getAll()
    socket.emit('firstProductsRender', productsData)
}