const socket = io.connect()

//FIRST RENDER
const useTemplate = async (data, templateFilename) => {
    try {
        const response = await fetch(`templates/${templateFilename}`)
        const template = await response.text()
        const newTemplate = Handlebars.compile(template)
        const newHtml = newTemplate(data)
        return newHtml
    }
    catch (err) {
        console.error(err)
    }
}
socket.on('firstProductsRender', async (productsData) => {
    try {
        const html = await useTemplate({productsData}, 'product-list.handlebars')
        document.getElementById('productList').innerHTML = html
    }
    catch (err) {
        console.error(err)
    }
})
socket.on('firstChatRender', async (chatData) => {
    try {
        const html = await useTemplate({chatData}, 'chat.handlebars')
        document.getElementById('chat').innerHTML = html
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