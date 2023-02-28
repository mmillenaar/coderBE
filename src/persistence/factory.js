import dotenv from 'dotenv'
dotenv.config()

let productsDao
let cartsDao
let usersDao

switch (process.env.PERS) {
    case 'fs':
        const { default: FsProductsDao } = await import('./DAOs/products/fs.productsDao.js')
        const { default: FsCartsDao } = await import('./DAOs/carts/fs.cartsDao.js')
        const { default: FsUsersDao } = await import('./DAOs/users/fs.usersDao.js')

        productsDao = new FsProductsDao()
        cartsDao = new FsCartsDao()
        usersDao = new FsUsersDao()
        break

    case 'firebase':
        const { default: FirebaseProductsDao } = await import('./DAOs/products/firebase.productsDao.js')
        const { default: FirebaseCartsDao } = await import('./DAOs/carts/firebase.cartsDao.js')
        const { default: FirebaseUsersDao } = await import('./DAOs/users/firebase.usersDao.js')

        productsDao = new FirebaseProductsDao()
        cartsDao = new FirebaseCartsDao()
        usersDao = new FirebaseUsersDao()
        break

    case 'mongodb':
        const { default: MongoDbProductsDao } = await import('./DAOs/products/mongoDb.productsDao.js')
        const { default: MongoDbCartsDao } = await import('./DAOs/carts/mongoDb.cartsDao.js')
        const { default: MongoDbUsersDao } = await import('./DAOs/users/mongoDb.usersDao.js')

        productsDao = new MongoDbProductsDao()
        cartsDao = new MongoDbCartsDao()
        usersDao = new MongoDbUsersDao()
        break
}

export default class FactoryDao {
    static getProductsDao() {
        return productsDao
    }
    static getCartsDao() {
        return cartsDao
    }
    static getUsersDao() {
        return usersDao
    }
}
