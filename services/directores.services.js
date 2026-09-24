import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://manuelrodriguezg_db_user:kx9pI5y1z29mdFP5@clustercito.oxzzic9.mongodb.net/"

const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getDirectores() {
    const directores = await db.collection("directores").find().toArray()
    return directores
}

export async function getDirectorById(id) {
    const director = await db.collection("directores").findOne({ _id: new ObjectId(id) })
    return director
}

export async function saveDirector(director) {
    const result = await db.collection("directores").insertOne(director)
    return { ...director, _id: result.insertedId }
}

export async function updateDirector(id, datos) {
    await db.collection("directores").updateOne(
        { _id: new ObjectId(id) },
        { $set: datos }
    )
}
