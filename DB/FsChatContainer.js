const { promises: fs } = require('fs')
const { normalize, denormalize, schema } = require('normalizr')
const util = require('util')

// const author = new schema.Entity('author')
// const message = new schema.Entity('message', {
//     email: author,
// })
// const chat = new schema.Entity('chat', {
//     email: author,
//     message: [message]
// })
// const chatSchema = new schema.Array(chat)

const author = new schema.Entity('author')
const message = new schema.Entity('message', {
    email: author,
})
const chat = new schema.Entity('chat', {
    chat: [message]
})

class FsChatContainer {
    constructor(filePath) {
        this.filePath = filePath
    }

    async getAllMessages() {
        try {
            let content = await fs.readFile(this.filePath, 'utf-8')
            // console.log({id: 'chat', chat:JSON.parse(content)});
            const normalizedMessages = normalize({id: 'chat1', chat: JSON.parse(content)}, chat)
            console.log(util.inspect(normalizedMessages, false, 12, true))
            return JSON.parse(content)
        }
        catch {
            return []
        }
    }
    async insertMessage(message) {
        try {
            let content = await this.getAllMessages()
            let newId
            if (content.length === 0) {
                newId = 1
            } else {
                const lastId = content[content.length - 1].id
                newId = lastId + 1
            }
            content.push({id: newId, ...message})
            await fs.writeFile(this.filePath, JSON.stringify(content, null, 4))
        } catch (error) {
            console.error(error);
        }
    }
}

exports.FsChatContainer = FsChatContainer