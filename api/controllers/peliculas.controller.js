import { ObjectId } from "mongodb"
import * as peliculasService from "../../services/peliculas.services.js"
import * as directoresService from "../../services/directores.services.js"

const generosValidos = ["accion", "comedia", "drama", "terror", "ciencia-ficcion"]

function campoVacio(valor) {
    return !valor || String(valor).trim() === ""
}

function idValido(id) {
    return typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id)
}

function validarDatosPelicula(body) {
    if (
        campoVacio(body.title) ||
        campoVacio(body.description) ||
        campoVacio(body.image) ||
        campoVacio(body.year) ||
        campoVacio(body.genre) ||
        campoVacio(body.trailer) ||
        campoVacio(body.directorId)
    ) {
        return "Completá todos los campos obligatorios."
    }
    if (!generosValidos.includes(body.genre)) {
        return "El género no es válido."
    }
    const anio = Number(body.year)
    if (Number.isNaN(anio) || anio <= 0) {
        return "El año debe ser un número válido."
    }
    if (!idValido(String(body.directorId))) {
        return "El directorId no es válido."
    }
    return null
}

export async function getPeliculas(req, res) {
    try {
        const filtros = req.query
        const peliculas = await peliculasService.getPeliculas(filtros)
        res.status(200).json(peliculas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPeliculaById(req, res) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            return res.status(404).json({ message: "Película no encontrada" })
        }
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.status(404).json({ message: "Película no encontrada" })
        }
        res.status(200).json(pelicula)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function savePelicula(req, res) {
    try {
        const error = validarDatosPelicula(req.body)
        if (error) {
            return res.status(400).json({ message: error })
        }
        const director = await directoresService.getDirectorById(req.body.directorId)
        if (!director) {
            return res.status(400).json({ message: "El director seleccionado no existe." })
        }
        const pelicula = {
            title: String(req.body.title).trim(),
            description: String(req.body.description).trim(),
            image: String(req.body.image).trim(),
            year: Number(req.body.year),
            genre: req.body.genre,
            trailer: String(req.body.trailer).trim(),
            directorId: new ObjectId(req.body.directorId)
        }
        const guardada = await peliculasService.savePelicula(pelicula)
        res.status(201).json(guardada)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updatePelicula(req, res) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            return res.status(404).json({ message: "Película no encontrada" })
        }
        const datos = { ...req.body }
        if (datos.title !== undefined && campoVacio(datos.title)) {
            return res.status(400).json({ message: "El título no puede estar vacío." })
        }
        if (datos.description !== undefined && campoVacio(datos.description)) {
            return res.status(400).json({ message: "La descripción no puede estar vacía." })
        }
        if (datos.image !== undefined && campoVacio(datos.image)) {
            return res.status(400).json({ message: "La imagen no puede estar vacía." })
        }
        if (datos.trailer !== undefined && campoVacio(datos.trailer)) {
            return res.status(400).json({ message: "El tráiler no puede estar vacío." })
        }
        if (datos.genre !== undefined && !generosValidos.includes(datos.genre)) {
            return res.status(400).json({ message: "El género no es válido." })
        }
        if (datos.year !== undefined) {
            const anio = Number(datos.year)
            if (Number.isNaN(anio) || anio <= 0) {
                return res.status(400).json({ message: "El año debe ser un número válido." })
            }
            datos.year = anio
        }
        if (datos.directorId !== undefined) {
            if (!idValido(String(datos.directorId))) {
                return res.status(400).json({ message: "El directorId no es válido." })
            }
            const director = await directoresService.getDirectorById(String(datos.directorId))
            if (!director) {
                return res.status(400).json({ message: "El director seleccionado no existe." })
            }
            datos.directorId = new ObjectId(datos.directorId)
        }
        const pelicula = await peliculasService.updatePelicula(id, datos)
        res.status(202).json(pelicula)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deletePelicula(req, res) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            return res.status(404).json({ message: "Película no encontrada" })
        }
        const pelicula = await peliculasService.deletePeliculaLogico(id)
        res.status(202).json(pelicula)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}