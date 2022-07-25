class User {
    constructor(name, surname) {
        this.name = name,
        this.surname = surname,
        this.books = []
        this.pets = []
    }

    getFullName = () => {
        return `${this.name} ${this.surname}`
    }

    addPet = (newPet) => {
        this.pets.push(newPet)
    }

    countPets = () => {
        return this.pets.length
    }

    addBook = (bookName, bookAuthor) => {
        let newBook = {
            name: bookName,
            author: bookAuthor
        }
        this.books.push(newBook)
    }

    getBookNames = () => {
        let bookNames = []
        this.books.forEach(book => {
            bookNames.push(book.name)
        })

        return bookNames
    }
}

let user1 = new User('Matias', 'Millenaar')

user1.addPet('dog')
user1.addPet('cat')
user1.countPets()

user1.addBook('El señor de las moscas', 'William Golding')
user1.addBook('Fundacion', 'Isaac Asimov')
user1.getBookNames()

user1.getFullName()