const socket = io.connect()

//FIRST RENDER
const useTemplate = async (data) => {
    try {
        const { productList, messages } = data
        const response = await fetch('templates/product-list.handlebars')
        const template = await response.text()
        const newTemplate = Handlebars.compile(template)
        const fullProductsHtml = newTemplate({productList, messages})
        return fullProductsHtml
    }
    catch (err) {
        console.error(err)
    }
}
socket.on('firstRender', async (firstData) => {
    try {
        const productsHtml = await useTemplate(firstData)
        document.getElementById('productList').innerHTML = productsHtml
    }
    catch (err) {
        console.error(err)
    }
})

//CHAT
const addMessage = () => {
    const message = {
        email: document.getElementById('email').value,
        date: new Date(),
        message: document.getElementById('message').value,
    }
    socket.emit('new-message', message)
    document.getElementById('message').value = ''
    return false
}
socket.on('new-chat-message', messages => {
    const chatHtml = messages.map((message) => {
        return (`
            <div>
                <strong style='color:blue'> ${message.email}</strong>
                <span style='color:brown'>${message.date}: </span>
                <em style='color:green'> ${message.message} </em>
            </div>
            `
        )
    }).join(' ')
    document.getElementById('chat').innerHTML = chatHtml
})