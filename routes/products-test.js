const router = require('express').Router();
const { faker } = require('@faker-js/faker')

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

router
.route('/')
.get((req, res) => {
        res.render('data', {productList})
    })

exports.router = router
exports.productList = productList