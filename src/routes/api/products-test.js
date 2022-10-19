import { Router } from 'express'
import { faker } from '@faker-js/faker'

let productList = []
const getFakerProduct = () => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(0, 1000),
        thumbnail: faker.image.abstract(undefined, undefined, true),
    }
}
for (let i = 0; i < 5; i++) {
    productList.push(getFakerProduct())
}

const productsTestApiRouter = new Router()
productsTestApiRouter
    .route('/')
    .get((req, res) => {
            res.render('data', {productList})
        })

export default productsTestApiRouter
export { productList }