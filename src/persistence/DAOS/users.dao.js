import usersSchema from "../../models/users.schema.js";
import MongoDbContainer from "../containers/mongodb.container.js";
import { asUsersDto } from "../DTOS/user.dto.js";

class UsersDao extends MongoDbContainer {
    constructor() {
        super('users', usersSchema)
    }

    async getAll() {
        return asUsersDto(await super.getAll())
    }
    async getById(id) {
        return asUsersDto(await super.getById(id))
    }
    async getElementByValue(field, value) {
        return asUsersDto(await super.getElementByValue(field, value))
    }
}

export default UsersDao