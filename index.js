const { promises: fs } = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
    }

    async save(object) {

        // get file content
        const fileContent = await this.getAll()

        // if file has got content, get last id and assign a higher one to the new object
        let newId
        if (fileContent.length == 0) {
            newId = 1
        } else {
            const lastId = fileContent[fileContent.length - 1].id
            newId = lastId + 1
        }

        // push new object to the file content array
        fileContent.push({id: newId, ...object})

        // save array in file
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch (err) {
            console.error(err);
        }

        // return id
        return newId
    }

    async getById(id) {

        // get file content
        const fileContent = await this.getAll()

        // filter object corresponding to id
        let filteredContent = fileContent.filter(object => object.id === id)

        return filteredContent
    }

    async getAll() {
        // return array with all objects in file
        try {
            let content = await fs.readFile(this.filePath, 'utf-8')

            return JSON.parse(content)
        }

        // if no content is found, return empty array
        catch {
            return []
        }
    }

    async deleteById(id) {
        // get file content
        const fileContent = await this.getAll()

        // remove object from content array
        let filteredContent = fileContent.filter(object => object.id !== id)

        if (filteredContent.length === fileContent.length) {
            console.error(`Error: could not find product id:${id}`); // TODO: english
        }

        // save new array in file
        try {
            await fs.writeFile(this.filePath, JSON.stringify(filteredContent, null, 2))
        }
        catch (err) {
            console.error(err);
        }
    }

    async deleteAll() {
        // delete al objects in file
        try {
            fs.writeFile(this.filePath, '')
        }
        catch (err) {
            console.error(err);
        }
    }
}

const productList = new Container('./products.txt')

let products = [
    {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1
    },
    {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
    },
    {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
    }
]



productList.save(products)
// productList.getById(1)
// productList.getAll()
// productList.deleteAll()
// productList.deleteById(2)