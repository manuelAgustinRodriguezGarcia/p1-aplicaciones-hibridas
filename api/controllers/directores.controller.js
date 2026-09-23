import * as directoresService from "../../services/directores.services.js"
import * as peliculasService from "../../services/peliculas.services.js"

function campoVacio(valor) {
    return !valor || String(valor).trim() === ""
}

function idValido(id) {
    return typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id)
}

export async function getDirectores(req, res) {
    try {
        const directores = await directoresService.getDirectores()
        res.status(200).json(directores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getDirectorById(req, res) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            return res.status(404).json({ message: "Director no encontrado" })
        }
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.status(404).json({ message: "Director no encontrado" })
        }
        res.status(200).json(director)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPeliculasByDirector(req, res) {
    try {
        const id = req.params.id
        if (!idValido(id)) {
            return res.status(404).json({ message: "Director no encontrado" })
        }
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.status(404).json({ message: "Director no encontrado" })
        }
        const peliculas = await peliculasService.getPeliculasByDirector(id)
        res.status(200).json(peliculas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function saveDirector(req, res) {
    try {
        if (campoVacio(req.body.name) || campoVacio(req.body.photo) || campoVacio(req.body.description)) {
            return res.status(400).json({ message: "Completá todos los campos obligatorios." })
        }
        const director = {
            name: String(req.body.name).trim(),
            photo: String(req.body.photo).trim(),
            description: String(req.body.description).trim()
        }
        const guardado = await directoresService.saveDirector(director)
        res.status(201).json(guardado)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}