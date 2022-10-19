class memoryContainer {
    constructor() {
        this.elements = []
    }

    getById(id) {
        const elem = this.elements.find(elem => elem.id == id)
        return elem || { error: `element not found` }
    }

    getAll() {
        return [...this.elements]
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

    update(elem) {
        const newElem = { ...elem, id: Number(elem.id) }
        const index = this.elements.findIndex(p => p.id == elem.id)
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
}

export default memoryContainer
