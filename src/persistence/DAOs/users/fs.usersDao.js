import FsContainer from "../../containers/fs.container.js";
import { asUsersDto } from '../../DTOs/users.dto.js';

export default class FsUsersDao extends FsContainer {
    constructor() {
        super('users.json')
    }

    async getUserByValue(field, value) {
        const user = await super.getElementByValue(field, value)
        return asUsersDto(user)
    }
    async getRawUserByValue(field, value) {
        const user = await super.getElementByValue(field, value)
        return user
    }
    async saveUser(user) {
        const savedUser = await super.saveObject(user)
        return asUsersDto(savedUser)
    }
    async modifyUser(modifiedUser) {
        const updatedUser = await super.modifyObject(modifiedUser)
        return asUsersDto(updatedUser)
    }
}