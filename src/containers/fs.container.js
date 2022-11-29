import { promises as fs } from 'fs'
import config from '../config/db.config.js'

export default class FsContainer {
    constructor(filePath) {
        this.filePath = `${config.fileSystem.path}/${filePath}`
    }

    async getAll() {
        try {
            let content = await fs.readFile(this.filePath, 'utf-8')
            return JSON.parse(content)
        }
        catch {
            return []
        }
    }
    async getById(id) {
        try {
            const fileContent = await this.getAll()
            let searchedIndex = fileContent.findIndex(element => element.id == id)
            if (searchedIndex < 0) {
                throw new Error(`Id:${id} not found in ${JSON.stringify(this.filePath)}`)
            }
            else {
                return fileContent[searchedIndex]
            }
        }
        catch (err) {
            err.status = 404
            throw err
        }
    }
    async saveObject(object) {
        try {
            const fileContent = await this.getAll()
            let newId
            if (fileContent.length === 0) {
                newId = 1
            }
            else {
                const lastId = fileContent[fileContent.length - 1].id
                newId = lastId + 1
            }
            fileContent.push({ id: newId, timestamp: Date.now(), ...object })
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
            return fileContent
        }
        catch (err) {
            throw err
        }
    }
    async modifyObject(modifiedObject) {
        try {
            const fileContent = await this.getAll()
            const objectIndex = fileContent.findIndex(element => element.id === modifiedObject.id)
            fileContent[objectIndex] = { ...modifiedObject }
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
            return fileContent[objectIndex]
        }
        catch(err) {
            throw err
        }
    }
    async deleteById(id) {
        try {
            const fileContent = await this.getAll()
            const filteredList = fileContent.filter(element => element.id !== id)
            if (filteredList.length == fileContent.length) {
                throw new Error(`Id:${id} not found in ${JSON.stringify(this.filePath)}`)
            } else {
                fileContent.length = 0
                filteredList.map(element => fileContent.push(element))
            }
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))

            return fileContent
        }
        catch (err) {
            err.status = 404
            throw err;
        }
    }
}