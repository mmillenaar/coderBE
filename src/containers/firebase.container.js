import admin from 'firebase-admin'
import config from "../config.js";

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
})
const db = admin.firestore()

export default class FirebaseContainer {
    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get();
            const objects = snapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            })
            return objects
        }
        catch (err) {
            throw new Error(`Error accessing database: ${err}`)
        }
    }
    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            const object = doc.data()
            if (!object) {
                throw new Error(`Id:${id} not found in database`)
            }
            else {
                return { id, ...object }
            }
        }
        catch (err) {
            err.status = 404
            throw err
        }
    }
    async saveObject(object) {
        try {
            const savedObject = await this.collection.add(object)
            return this.modifyObject(savedObject.id, object) // so as to have the id incorporated inside the cart
        }
        catch (err) {
            throw err
        }
    }
    async modifyObject(id, object) {
        try {
            await this.collection.doc(id).set(object);
            return this.getById(id)
        }
        catch (err) {
            throw err
        }
    }
    async deleteById(id) {
        try {
            const collection = this.getAll()
            const newCollection = await this.collection.doc(id).delete();
            if (newCollection.length === collection.length) {
                throw new Error(`Id:${id} not found in database`)
            }
            else {
                return this.getAll()
            }
        }
        catch (err) {
            err.status = 404
            throw err
        }
    }
}