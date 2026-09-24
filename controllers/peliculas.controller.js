import { ObjectId } from "mongodb"
import * as peliculasService from "../services/peliculas.services.js"
import * as directoresService from "../services/directores.services.js"
import * as peliculasView from "../views/peliculas.views.js"

const generosValidos = ["accion", "comedia", "drama", "terror", "ciencia-ficcion"]

function datosPeliculaDesdeBody(body) {
    return {
        title: body.title,
        description: body.description,
        image: body.image,
        year: Number(body.year),
        genre: body.genre,
        trailer: body.trailer,
        directorId: new ObjectId(body.directorId)
    }
}

export async function getPeliculas(req, res) {
    try {
        const filtros = req.query
        const peliculas = await peliculasService.getPeliculas(filtros)
        const anios = await peliculasService.getAniosDisponibles()
        res.send(peliculasView.listaPeliculas(peliculas, filtros, anios))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function getAdministrar(req, res) {
    try {
        const peliculas = await peliculasService.getPeliculas()
        res.send(peliculasView.panelAdministrar(peliculas))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function getPeliculasPorGenero(req, res) {
    try {
        const genero = req.params.genero
        if (!generosValidos.includes(genero)) {
            return res.status(404).send(peliculasView.pagina404())
        }
        const peliculas = await peliculasService.getPeliculas({ genre: genero })
        res.send(peliculasView.listaPeliculasPorGenero(peliculas, genero))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function getPeliculaById(req, res) {
    try {
        const id = req.params.id
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.status(404).send(peliculasView.pagina404())
        }
        const director = await directoresService.getDirectorById(String(pelicula.directorId))
        res.send(peliculasView.detallePelicula(pelicula, director))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function formularioNuevaPelicula(req, res) {
    try {
        const directores = await directoresService.getDirectores()
        res.send(peliculasView.formularioNuevaPelicula(directores))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function savePelicula(req, res) {
    try {
        const guardada = await peliculasService.savePelicula(datosPeliculaDesdeBody(req.body))
        const director = await directoresService.getDirectorById(String(guardada.directorId))
        res.send(peliculasView.detallePelicula(guardada, director))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function formularioEditarPelicula(req, res) {
    try {
        const id = req.params.id
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.status(404).send(peliculasView.pagina404())
        }
        const directores = await directoresService.getDirectores()
        res.send(peliculasView.formularioEditarPelicula(pelicula, directores))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function updatePelicula(req, res) {
    try {
        const id = req.params.id
        const datos = datosPeliculaDesdeBody(req.body)
        await peliculasService.updatePelicula(id, datos)
        const pelicula = await peliculasService.getPeliculaById(id)
        const director = await directoresService.getDirectorById(String(pelicula.directorId))
        res.send(peliculasView.detallePelicula(pelicula, director))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function formularioBorrarPelicula(req, res) {
    try {
        const id = req.params.id
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.status(404).send(peliculasView.pagina404())
        }
        res.send(peliculasView.confirmacionBorrarPelicula(pelicula))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function deletePelicula(req, res) {
    try {
        const id = req.params.id
        await peliculasService.deletePeliculaLogico(id)
        res.redirect("/peliculas/administrar")
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}