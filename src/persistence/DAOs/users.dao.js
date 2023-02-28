import dotenv from 'dotenv'
import MongoDbContainer from '../../containers/mongoDb.container.js';
import usersSchema from "../../../models/users.schema.js";
import { asUsersDto } from '../../DTOs/users.dto.js';

dotenv.config()

export default class MongoDbUsersDao extends MongoDbContainer {
    constructor() {
        switch (process.env.PERS) {
            case 'fs':
                super('users.json')
                break;

            case 'firebase':
                super ('users')
                break;

            case 'mongodb':
                super('users', usersSchema)
                break;
        }
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
    async modidyUser(modifiedUser) {
        const updatedUser = await super.modifyObject(modifiedUser)
        return asUsersDto(updatedUser)
    }
}