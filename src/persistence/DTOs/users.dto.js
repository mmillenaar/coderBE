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

class UserDto {
    constructor({ name, address, age, countryCode, phone, avatar, email, cart, ...args }) {
        this.id = args[dbIdNaming],
        this.name = name,
        this.address = address,
        this.age = age,
        this.countryCode = countryCode,
        this.phone = phone,
        this.avatar = avatar,
        this.email = email
        this.cart = cart
    }
}

export const asUsersDto = (users) => {
    if (Array.isArray(users)) {
        return users.map(user => new UserDto(user))
    }
    else {
        return new UserDto(users)
    }
}