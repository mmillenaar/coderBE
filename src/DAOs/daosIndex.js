import FsCartsDao from "./carts/fs.cartsDao.js"
import FsProductsDao from "./products/fs.productsDao.js"
import MongoDbCartsDao from "./carts/mongoDb.cartsDao.js"
import MongoDbProductsDao from "./products/mongoDb.productsDao.js"

let productsDao = new MongoDbProductsDao()
let cartsDao = new MongoDbCartsDao()

export { productsDao, cartsDao }