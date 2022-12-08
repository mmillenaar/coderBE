import MongoDbContainer from "../persistence/mongodb.container.js";
import usersSchema from "../models/users.schema.js";
import bcrypt from 'bcrypt'

const usersApi = new MongoDbContainer('users', usersSchema)

export const authenticateUser = async (email, password) => {
    let user
    try {
        user = await usersApi.getByUsername(email)
    }
    catch (err) {
        throw new Error(`Authentication error: unable to find user: ${email}`)
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error(`Authentication error: incorrect password`)
    }
    return user
}
export const registerUser = async (userData) => {
    await usersApi.checkDuplicate('email', userData.email)
    userData.password = createHash(userData.password)
    const user = await usersApi.save(userData)
    return user
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export default usersApi