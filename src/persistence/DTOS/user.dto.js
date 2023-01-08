class UserDto {
    constructor({ _id, name, email }) {
        this.id = _id,
        this.name = name,
        this.email = email
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