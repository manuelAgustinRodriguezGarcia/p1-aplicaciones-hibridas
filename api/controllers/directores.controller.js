import * as directoresService from "../../services/directores.services.js"
import * as peliculasService from "../../services/peliculas.services.js"

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
        const peliculas = await peliculasService.getPeliculasByDirector(id)
        res.status(200).json(peliculas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function saveDirector(req, res) {
    try {
        const director = {
            name: req.body.name,
            photo: req.body.photo,
            description: req.body.description
        }
        const guardado = await directoresService.saveDirector(director)
        res.status(201).json(guardado)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}