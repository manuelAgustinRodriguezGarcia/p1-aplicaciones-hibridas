import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://manuelrodriguezg_db_user:kx9pI5y1z29mdFP5@clustercito.oxzzic9.mongodb.net/"

const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getPeliculas(filtros = {}) {
    const filter = { eliminado: { $ne: true } }

    if (filtros.genre) {
        filter.genre = filtros.genre
    }

    if (filtros.year) {
        filter.year = Number(filtros.year)
    }

    const peliculas = await db.collection("peliculas").find(filter).toArray()
    return peliculas
}

export async function getAniosDisponibles() {
    const peliculas = await db.collection("peliculas").find({ eliminado: { $ne: true } }).toArray()
    const anios = []
    peliculas.forEach((pelicula) => {
        if (!anios.includes(pelicula.year)) {
            anios.push(pelicula.year)
        }
    })
    anios.sort((a, b) => b - a)
    return anios
}

export async function getPeliculaById(id) {
    const pelicula = await db.collection("peliculas").findOne({ _id: new ObjectId(id) })
    return pelicula
}

export async function getPeliculasByDirector(idDirector) {
    const peliculas = await db.collection("peliculas").find({
        directorId: new ObjectId(idDirector),
        eliminado: { $ne: true }
    }).toArray()
    return peliculas
}

export async function savePelicula(pelicula) {
    await db.collection("peliculas").insertOne(pelicula)
    return pelicula
}

export async function updatePelicula(id, pelicula) {
    await db.collection("peliculas").updateOne(
        { _id: new ObjectId(id) },
        { $set: pelicula }
    )
    return pelicula
}

export async function deletePeliculaLogico(id) {
    const pelicula = await getPeliculaById(id)
    await db.collection("peliculas").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )
    return pelicula
}
