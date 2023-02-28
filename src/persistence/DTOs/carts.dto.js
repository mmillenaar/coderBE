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

class CartDto {
    constructor({ timestamp, cart, ...args }) {
        this.id = args[dbIdNaming],
        this.timestamp = timestamp,
        this.cart = cart
    }
}

export const asCartsDto = (carts) => {
    if (Array.isArray(carts)) {
        return carts.map(cart => new CartDto(cart))
    }
    else {
        return new CartDto(carts)
    }
}