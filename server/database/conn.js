import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
    const mongod = await MongoMemoryServer.create() // Create a Mongo-Memory-Sever Instance that can be awaited
    const getUri = mongod.getUri()
    console.log(`MongoMemoryServer: ${getUri}`)
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(getUri)
    console.log("Database Connected")
    return db
}

export default connect