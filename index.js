const { promises: fs } = require('fs')
const express = require('express')
const app = express()

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

        if (filteredContent.length === 0) {
            return null
        }
        else {
            return filteredContent
        }
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

    async getRandomProduct() {
        try {
            let allProducts = await productList.getAll()
            let randomIndex = Math.floor(Math.random() * allProducts.length)

            return allProducts[randomIndex]
        }
        catch (err) {
            console.error(err);
        }
    }
}

const productList = new Container('./products.txt')

// productList.save(product)
// productList.getById(1)
// productList.getAll()
// productList.deleteAll()
// productList.deleteById(2)
// productList.getRandomProduct()


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening at port: ${server.address().port}`);
})
server.on("error", error => console.error(`Error in server ${error}`))


app.get('/products', async (req, res) => {
    try {
        let allProducts = await productList.getAll()
        res.send(allProducts)
    }
    catch (err) {
        console.error(err);
    }
})

app.get('/randomProduct', async (req, res) => {
    try {
        let randomProduct = await productList.getRandomProduct()
        res.send(randomProduct)
    }
    catch (err) {
        console.error(err);
    }
})