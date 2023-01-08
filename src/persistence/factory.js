import mongoose from "mongoose"
import config from '../config/dbs.js'
import { PERS } from "../config/args.js"
import logger from "../config/logger.js"

let messagesDao
let productsDao
let usersDao

switch (PERS) {
    case 'mongo':
        const { default: MessagesDao } = await import('./DAOS/messages.dao.js')
        const { default: ProductsDao } = await import('./DAOS/products.dao.js')
        const { default: UsersDao } = await import('./DAOS/users.dao.js')

        await mongoose.connect(config.mongoDb.URL, config.mongoDb.options,
            (err) => {
                if (err) {
                    logger.error(err)
                    throw err
                }
                logger.info('MongoDb connected');
            }
        )

        messagesDao = new MessagesDao()
        productsDao = new ProductsDao()
        usersDao = new UsersDao()
        break;

    case 'fs':
        const { default: FsDao } = await import('./containers/fs.container.js')

        messagesDao = new FsDao('./DB/chat.json')
        productsDao = new FsDao('./DB/products.json')
        usersDao = new FsDao('./DB/users.json')
        break;

    case 'memory':
        const { default: MemoryDao } = await import('./containers/memory.container.js')

        messagesDao = new MemoryDao()
        productsDao = new MemoryDao()
        usersDao = new MemoryDao()
}

export default class FactoryDao {
    static getMessagesDao() {
    return messagesDao
    }
    static getProductsDao() {
        return productsDao
    }
    static getUsersDao() {
        return usersDao
    }
}