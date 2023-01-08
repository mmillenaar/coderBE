import logger from "../../config/logger.js"
import messagesApi from "../../services/messages.api.js"

export default async function socketMessagesConfiguration(socket, sockets) {
    const chatData = await messagesApi.getAll()
    socket.emit('firstChatRender', chatData)

    socket.on('new-message', async message => {
        try {
            await messagesApi.save(message)
            const newChatData = await messagesApi.getAll()
            sockets.emit('new-chat-message', newChatData)
        }
        catch (err) {
            logger.error(err)
        }
    })
}