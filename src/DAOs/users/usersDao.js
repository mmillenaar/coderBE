import bcrypt from 'bcrypt'
import MongoDbContainer from "../../containers/mongoDb.container.js";
import usersSchema from "../../models/users.schema.js";

export default class UsersDao extends MongoDbContainer {
    constructor() {
        super('users', usersSchema)
    }

    async authenticateUser(email, password) {
        let user
        try {
            user = await super.getByUsername(email)
        }
        catch (err) {
            throw new Error(`Authentication error: unable to find user: ${email}`)
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error(`Authentication error: incorrect password`)
        }
        return user
    }
    async registerUser(userData) {
        try {
            await super.checkDuplicate('email', userData.email)
            userData.password = this.createHash(userData.password)
            const user = await super.saveObject(userData)
            return user
        }
        catch (err) {
            throw err
        }
    }
    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }
}