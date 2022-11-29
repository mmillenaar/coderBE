import mongoose from 'mongoose'
import config from "../config/db.config.js";

await mongoose.connect(config.mongoDb.URL, config.mongoDb.options,
    (err) => {
    if(err) {
        throw err
    }
    console.log('MongoDb connected');
    })

export default class MongoDbContainer {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema)
    }

    async getAll() {
        try {
            const allContent = await this.collection.find().select('-__v').lean()
            return allContent
        } catch (err) {
            throw new Error(`Error accessing database: ${err}`)
        }
    }
    async getById(id) {
        try {
            const foundObject = await this.collection.findById(id).select('-__v').lean()
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
    async saveObject(object) {
        try {
            const newObjectSchema = new this.collection(object)
            const savedObject = await newObjectSchema.save()
            return this.getById(savedObject._id)
        } catch (err) {
            throw err
        }
    }
    async modifyObject(object) {
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