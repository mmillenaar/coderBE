import messagesSchema from "../../models/messages.schema.js";
import MongoDbContainer from "../containers/mongodb.container.js";
import { asMessagesDto } from "../DTOS/message.dto.js";

class MesagesDao extends MongoDbContainer {
    constructor() {
        super('messages', messagesSchema)
    }

    async getAll() {
        return asMessagesDto(await super.getAll())
    }
    async getById(id) {
        return asMessagesDto(await super.getById(id))
    }
    async getElementByValue(field, value) {
        return asMessagesDto(await super.getElementByValue(field, value))
    }
}

export default MesagesDao