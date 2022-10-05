import { promises as fs } from 'fs'
import config from '../config.js'

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
        const fileContent = await this.getAll()
        let searchedIndex = fileContent.findIndex(element => element.id == id)
        if (searchedIndex < 0) {
            throw new Error(`GET: id:${id} not found in ${JSON.stringify(this.filePath)}`)
        }
        else {
            return fileContent[searchedIndex]
        }
    }
    async saveObject(object) {
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
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent
    }
    async modifyObject(modifiedObject) {
        const fileContent = await this.getAll()
        const objectIndex = fileContent.findIndex(element => element.id === modifiedObject.id)
        fileContent[objectIndex] = {...modifiedObject}
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent[objectIndex]
    }
    async deleteById(id) {
        const fileContent = await this.getAll()
        const filteredList = fileContent.filter(element => element.id !== id)
        if (filteredList.length == fileContent.length) {
            throw new Error(`DELETE: id:${id} not found in ${JSON.stringify(this.filePath)}`)
        } else {
            fileContent.length = 0
            filteredList.map(element => fileContent.push(element))
        }
        try {
            await fs.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
        }
        catch {
            throw new Error('Error while saving data');
        }
        return fileContent
    }
}