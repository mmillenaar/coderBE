import mongoose from 'mongoose'
import config from '../../config/db.config.js'
import logger from '../../config/logger.config.js';

await mongoose.connect(config.mongoDb.URL, config.mongoDb.options,
    (err) => {
        if (err) {
            logger.error(err)
            throw err
        }
        logger.info('MongoDb connected');
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
            logger.error(err)
            throw new Error(`Error accessing database: ${err}`)
        }
    }
    async getById(id) {
        try {
            const foundObject = await this.collection.findById(id).select('-__v').lean()
            if (!foundObject) {
                logger.error(`Object with id ${id} not found in DB`)
                throw new Error()
            }
            else {
                return foundObject
            }
        } catch (err) {
            err.status = 404
            logger.error(err)
            throw err
        }
    }
    async getElementByValue(field, value) {
        try {
            const foundElement = await this.collection.findOne({ [field] : value}).select('-__v').lean()
            if (foundElement) {
                return foundElement
            }
        } catch (err) {
            err.status = 404
            logger.error(err)
            throw err
        }
    }
    async saveObject(object) {
        try {
            const newObjectSchema = new this.collection(object)
            const savedObject = await newObjectSchema.save()
            return this.getById(savedObject._id)
        } catch (err) {
            logger.error(err)
            throw err
        }
    }
    async modifyObject(object) {
        try {
            await this.collection.replaceOne({ _id: object.id }, object)
            return this.getById(object.id)
        } catch (err) {
            logger.error(err)
            throw err
        }
    }
    async deleteById(id) {
        try {
            await this.collection.deleteOne({ _id: id })
            return this.getAll()
        } catch (err) {
            err.status = 404
            logger.error(err)
            throw err
        }
    }
    async checkIsDuplicate(field, value) {
        try {
            const element = await this.getElementByValue(field, value)
            if (element) {
                return true
            }
            else {
                return false
            }
        }
        catch (err) {
            logger.error(err)
            throw err
        }
    }
}