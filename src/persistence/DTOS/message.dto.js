class MessageDto {
    constructor(email, date, message) {
        this.email = email,
        this.date = date,
        this.message = message
    }
}

export const asMessagesDto = (messages) => {
    if (Array.isArray(messages)) {
        return messages.map(message => new MessageDto(message))
    }
    else {
        return new MessageDto(messages)
    }
}