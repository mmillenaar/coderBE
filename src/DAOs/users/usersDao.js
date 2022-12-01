import bcrypt from 'bcrypt'
import MongoDbContainer from "../../containers/mongoDb.container.js";
import usersSchema from "../../models/users.schema.js";

export default class UsersDao extends MongoDbContainer {
    constructor() {
        super('users', usersSchema)
    }

    async getUserByEmail(email) {
        const user = await super.getElementByValue('email', email)
        return user
    }
    async authenticateUser(email, password) {
        let user
        try {
            user = await this.getUserByEmail(email)
        }
        catch (err) {
            throw new Error(`Authentication error: unable to find user ${email}`)
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error(`Authentication error: incorrect password`)
        }
        return user
    }
    async registerUser(userData) {
        try {
            const isDuplicate = await super.checkIsDuplicate('email', userData.email)
            if (!isDuplicate) {
                userData.password = this.createHash(userData.password)
                const user = await super.saveObject(userData)
                return user
            }
            else {
                throw new Error(`${userData.email} already exists in field email`)
            }
        }
        catch (err) {
            throw err
        }
    }
    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }
    async updateUser(user) {
        const updatedUser = await super.modifyObject(user)
        return updatedUser
    }
}