import config from "../config.js";
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
        } catch (error) {
            throw new Error(`Error using getAll(): ${error}`)
        }
    }
    async getById(id) {
        try {
            const foundObject = await this.collection.findById(id).select('-__v')
            return foundObject
        } catch (error) {
            throw new Error(`Error using getById(): ${error}`)
        }
    }
    async saveObject(object) {
        try {
            const newObjectSchema = new this.collection(object)
            const savedObject = await newObjectSchema.save()
            return this.getById(savedObject._id)
        } catch (error) {
            throw new Error(`Error using saveObject(): ${error}`)
        }
    }
    async modifyObject(object) {
        try {
            await this.collection.replaceOne({ _id: object.id }, object)
            return this.getById(object.id)
        } catch (error) {
            throw new Error(`Error using modifyObject(): ${error}`)
        }
    }
    async deleteById(id) {
        try {
            await this.collection.deleteOne({ _id: id })
            return this.getAll()
        } catch (error) {
            throw new Error(`Error using deleteById(): ${error}`)
        }
    }
}