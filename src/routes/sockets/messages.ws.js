import messagesApi from "../../api/messages.api.js"

export default async function socketMessagesConfiguration(socket, sockets) {
    const chatData = await messagesApi.getAll()
    socket.emit('firstChatRender', chatData)

    socket.on('new-message', async message => {
        await messagesApi.save(message)
        const newChatData = await messagesApi.getAll()
        sockets.emit('new-chat-message', newChatData)
    })
}