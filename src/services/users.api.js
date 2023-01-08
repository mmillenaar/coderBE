import bcrypt from 'bcrypt'
import logger from '../config/logger.js';
import FactoryDao from '../persistence/factory.js';

const usersApi = FactoryDao.getUsersDao()

export const getUserByEmail = async (email) => {
    const user = usersApi.getElementByValue('email', email)
    return user
}
export const authenticateUser = async (email, password) => {
    let user
    try {
        user = await getUserByEmail(email)
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
    try {
        const isDuplicate = await usersApi.checkIsDuplicate('email', userData.email)
        if (!isDuplicate) {
            userData.password = createHash(userData.password)
            const user = await usersApi.save(userData)
            return user
        }
        else {
            throw new Error(`${userData.email} already exists in field email`)
        }
    }
    catch (err) {
        logger.error(err)
    }
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export default usersApi