import config from '../config/dbs.js';
import mongoose from 'mongoose'

await mongoose.connect(config.mongoDb.URL, config.mongoDb.options,
    (err) => {
    if(err) {
        console.log(err);
    }
    console.log('MongoDb connected');
    })

export default class MongoDbContainer {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async getAll() {
        try {
            const allContent = await this.collection.find().select('-__v')
            return allContent
        } catch (err) {
            throw new Error(`Error accessing database: ${err}`)
        }
    }
    async getById(id) {
        try {
            const foundObject = await this.collection.findById(id).select('-__v')
            if (!foundObject) {
                throw new Error()
            }
            else {
                return foundObject
            }
        } catch (err) {
            err.status = 404
            throw err
        }
    }
    async getByUsername(username) {
        try {
            const foundObject = await this.collection.findOne({email: username}).select('-__v')
            if (!foundObject) {
                throw new Error(`Username ${username} not found in DB`)
            }
            else {
                return foundObject
            }
        } catch (err) {
            err.status = 404
            throw err
        }
    }
    async save(object) {
        try {
            const newObjectSchema = new this.collection(object)
            const savedObject = await newObjectSchema.save()
            return this.getById(savedObject._id)
        } catch (err) {
            throw err
        }
    }
    async update(object) {
        try {
            await this.collection.replaceOne({ _id: object.id }, object)
            return this.getById(object.id)
        } catch (err) {
            throw err
        }
    }
    async deleteById(id) {
        try {
            await this.collection.deleteOne({ _id: id })
            return this.getAll()
        } catch (err) {
            err.status = 404
            throw err
        }
    }
    async deleteAll() {
        try {
            await this.collection.deleteMany({})
            return this.getAll()
        }
        catch (err) {
            throw err
        }
    }
    async checkDuplicate(field, data) {
        try {
            const object = await this.collection.findOne({ [field]: data })
            if (object) {
                throw new Error(`${data} already exists in field ${field}`)
            }
        }
        catch (err) {
            throw err
        }
    }
}