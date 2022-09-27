const knexLib = require('knex')

class Container {
    constructor(dbName, dbConfig) {
        this.dbName = dbName,
        this.knex = knexLib(dbConfig)
    }

    async insert(element) {
        try {
            return await this.knex(this.dbName).insert(element)
        }
        catch (err) {
            throw new Error(`Error inserting element: ${err}`)
        }
    }
    async getAll() {
        try {
            return await this.knex(this.dbName).select('*')
        }
        catch(err) {
            throw new Error(`Error getting all data: ${err}`)
        }
    }
    async getById(id) {
        try {
            return await this.knex(this.dbName).select('*').where('id', id)
        }
        catch(err) {
            throw new Error(`Error getting by id${id}: ${err}`)
        }
    }
    async update(newElement, id) {
        try {
            return await this.knex(this.dbName).where('id', id).update(newElement)
        }
        catch (err) {
            throw new Error(`Error updating id${id}: ${err}`)
        }
    }
    async deleteById(id) {
        try {
            return await this.knex(this.dbName).delete().where('id', id)
        }
        catch(err) {
            throw new Error(`Error deleting by id${id}: ${err}`)
        }
    }
}

module.exports = Container