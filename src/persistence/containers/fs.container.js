import { promises as fs } from 'fs'

class FsContainer {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            const elements = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(elements)
        } catch (error) {
            return []
        }
    }
    async getById(id) {
        const elements = await this.getAll()
        const searchedElement = elements.find(e => e.id == id)
        return searchedElement
    }
    async getElementByValue(field, value) {
        const elements = await this.getAll()
        const searchedElement = elements.find(e => e[field] == value)
        if (searchedElement) {
            return searchedElement
        }
    }
    async save(elem) {
        const elements = await this.getAll()
        let newId
        if (elements.length == 0) {
            newId = 1
        } else {
            newId = elements[elements.length - 1].id + 1
        }
        const newElem = { id: newId, ...elem }
        elements.push(newElem)
        try {
            await fs.writeFile(this.path, JSON.stringify(elements, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error while saving: ${error}`)
        }
    }
    async update(elem, id) {
        const elements = await this.getAll()
        const searchedIndex = elements.findIndex(e => e.id == id)
        if (searchedIndex == -1) {
            throw new Error(`Error updating: could not find id:${id}`)
        } else {
            elements[searchedIndex] = { id: id, ...elem }
            try {
                await fs.writeFile(this.path, JSON.stringify(elements, null, 2))
            } catch (error) {
                throw new Error(`Error while updating: ${error}`)
            }
        }
    }
    async deleteById(id) {
        const elements = await this.getAll()
        const searchedIndex = elements.findIndex(e => e.id == id)
        if (searchedIndex == -1) {
            throw new Error(`Error while deleting: could not find id:${id}`)
        }
        elements.splice(searchedIndex, 1)
        try {
            await fs.writeFile(this.path, JSON.stringify(elements, null, 2))
        } catch (error) {
            throw new Error(`Error while deleting: ${error}`)
        }
    }
    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error while deleting all: ${error}`)
        }
    }
    async checkIsDuplicate(field, value) {
        const searchedElement = await this.getElementByValue(field, value)
        if (searchedElement) {
            return true
        }
        else {
            return false
        }
    }
}

export default FsContainer