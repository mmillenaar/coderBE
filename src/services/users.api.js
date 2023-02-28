import bcrypt from 'bcrypt'
import logger from '../config/logger.config.js';
import FactoryDao from "../persistence/factory.js";
import productsApi from './products.api.js';

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const usersApi = FactoryDao.getUsersDao()

usersApi.getUserByEmail = async (email) => {
    const user = await usersApi.getUserByValue('email', email)
    return user
}
usersApi.getRawUserByEmail = async (email) => {
    const user = await usersApi.getRawUserByValue('email', email)
    return user
}
usersApi.authenticateUser = async (email, password) => {
    let user
    try {
        user = await usersApi.getRawUserByEmail(email)
    }
    catch (err) {
        throw new Error(`Authentication error: unable to find user ${email}`)
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error(`Authentication error: incorrect password`)
    }
    return user
}
usersApi.registerUser = async (userData) => {
    try {
        const isDuplicate = await usersApi.checkIsDuplicate('email', userData.email)
        if (!isDuplicate) {
            userData.password = createHash(userData.password)
            const user = await usersApi.saveUser(userData)
            return user
        }
        else {
            throw new Error(`${userData.email} already exists in field email`)
        }
    }
    catch (err) {
        logger.error(err)
        throw err
    }
}
usersApi.updateUser = async (user) => {
    const updatedUser = await usersApi.modifyUser(user)
    return updatedUser
}
usersApi.getRoot = async (user) => {
    const dbUser = await usersApi.getUserByEmail(user.email)
    return dbUser
}

export default usersApi