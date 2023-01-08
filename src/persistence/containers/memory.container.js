class memoryContainer {
    constructor() {
        this.elements = []
    }

    getAll() {
        return [...this.elements]
    }
    getById(id) {
        const elem = this.elements.find(elem => elem.id == id)
        return elem || { error: `element not found` }
    }
    getElementByValue(field, value) {
        const elem = this.elements.find(elem => elem[`${field}`] == value)
        if (elem) {
            return elem
        }
    }
    save(elem) {
        let newId
        if (this.elements.length == 0) {
            newId = 1
        } else {
            newId = this.elements[this.elements.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elements.push(newElem)
        return newElem
    }
    update(elem, id) {
        const newElem = { ...elem, id: Number(id) }
        const index = this.elements.findIndex(p => p.id == id)
        if (index == -1) {
            return { error: `element not found` }
        } else {
            this.elements[index] = newElem
            return newElem
        }
    }
    deleteById(id) {
        const index = this.elements.findIndex(elem => elem.id == id)
        if (index == -1) {
            return { error: `element not found` }
        } else {
            return this.elements.splice(index, 1)
        }
    }
    deleteAll() {
        this.elements = []
    }
    checkIsDuplicate(field, value) {
        const element = this.getElementByValue(field, value)
        if (element) {
            return true
        }
        else {
            return false
        }
    }
}

export default memoryContainer