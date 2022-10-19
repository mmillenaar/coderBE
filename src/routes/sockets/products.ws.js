import productsApi from "../../api/products.api.js"

export default async function socketProductsConfiguration(socket, sockets) {
    const productsData = await productsApi.getAll()
    socket.emit('firstProductsRender', productsData)
}