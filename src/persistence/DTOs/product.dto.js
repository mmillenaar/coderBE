import dotenv from 'dotenv'
dotenv.config()

let dbIdNaming

switch (process.env.PERS) {
    case 'mongodb':
        dbIdNaming = '_id'
        break;

    default:
        dbIdNaming = 'id'
        break;
}

class ProductDto {
    constructor({ timestamp, description, code, title, thumbnail, price, stock, ...args }) {
        this.id = args[dbIdNaming],
        this.timestamp = timestamp,
        this.description = description,
        this.code = code,
        this.title = title,
        this.thumbnail = thumbnail,
        this.price = price,
        this.stock = stock
    }
}

export const asProductsDto = (products) => {
    if (Array.isArray(products)) {
        return products.map(product => new ProductDto(product))
    }
    else {
        return new ProductDto(products)
    }
}