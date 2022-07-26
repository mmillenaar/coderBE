import dotenv from 'dotenv'
import UsersDao from './users/usersDao.js'
dotenv.config()

let productsDao
let cartsDao
let usersDao

switch (process.env.PERS) {
    case 'fs':
        const { default: FsProductsDao } = await import('./products/fs.productsDao.js')
        const { default: FsCartsDao } = await import('./carts/fs.cartsDao.js')

        productsDao = new FsProductsDao()
        cartsDao = new FsCartsDao()
        break

    case 'firebase':
        const { default: FirebaseProductsDao } = await import('./products/firebase.productsDao.js')
        const { default: FirebaseCartsDao } = await import('./carts/firebase.cartsDao.js')

        productsDao = new FirebaseProductsDao()
        cartsDao = new FirebaseCartsDao()
        break

    case 'mongodb':
        const { default: MongoDbProductsDao } = await import('./products/mongoDb.productsDao.js')
        const { default: MongoDbCartsDao } = await import('./carts/mongoDb.cartsDao.js')

        productsDao = new MongoDbProductsDao()
        cartsDao = new MongoDbCartsDao()
        usersDao = new UsersDao()
        break
}

export { productsDao, cartsDao, usersDao }
