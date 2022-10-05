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
        } catch (error) {
            throw new Error(`Error using getAll(): ${error}`)
        }
    }
    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            const object = doc.data()
            return { id, ...object }
        } catch (error) {
            throw new Error(`Error using getById(): ${error}`)
        }
    }
    async saveObject(object) {
        try {
            const savedObject = await this.collection.add(object)
            return this.modifyObject(savedObject.id, object) // so as to have the id incorporated inside the cart
        } catch (error) {
            throw new Error(`Error using saveObject(): ${error}`)
        }
    }
    async modifyObject(id, object) {
        try {
            await this.collection.doc(id).set(object);
            return this.getById(id)
        } catch (error) {
            throw new Error(`Error using modifyObject(): ${error}`)
        }
    }
    async deleteById(id) {
        try {
            await this.collection.doc(id).delete();
            return this.getAll()
        } catch (error) {
            throw new Error(`Error using deleteById(): ${error}`)
        }
    }
}