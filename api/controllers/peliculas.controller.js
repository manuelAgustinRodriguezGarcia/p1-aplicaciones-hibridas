import * as peliculasService from "../../services/peliculas.services.js"

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
        const pelicula = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            year: Number(req.body.year),
            genre: req.body.genre,
            trailer: req.body.trailer
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
        const datos = { ...req.body }
        if (datos.year !== undefined) {
            datos.year = Number(datos.year)
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
        const pelicula = await peliculasService.deletePeliculaLogico(id)
        res.status(202).json(pelicula)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
