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
            const aaa = await this.collection.deleteOne({ _id: id })
            console.log(aaa);
            return this.getAll()
        } catch (err) {
            err.status = 404
            throw err
        }
    }
}