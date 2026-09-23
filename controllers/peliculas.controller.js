import { ObjectId } from "mongodb"
import * as peliculasService from "../services/peliculas.services.js"
import * as directoresService from "../services/directores.services.js"
import * as peliculasView from "../views/peliculas.views.js"

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
    if (!idValido(body.directorId)) {
        return "Seleccioná un director válido."
    }
    return null
}

function datosPeliculaDesdeBody(body) {
    return {
        title: String(body.title).trim(),
        description: String(body.description).trim(),
        image: String(body.image).trim(),
        year: Number(body.year),
        genre: body.genre,
        trailer: String(body.trailer).trim(),
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

export async function getPeliculasPorGenero(req, res) {
    try {
        const genero = req.params?.genero
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
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(peliculasView.pagina404())
        }
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.status(404).send(peliculasView.pagina404())
        }
        let director = null
        if (pelicula.directorId) {
            director = await directoresService.getDirectorById(String(pelicula.directorId))
        }
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
        const directores = await directoresService.getDirectores()
        const error = validarDatosPelicula(req.body)
        if (error) {
            return res.send(peliculasView.formularioNuevaPelicula(directores, error, req.body))
        }
        const director = await directoresService.getDirectorById(req.body.directorId)
        if (!director) {
            return res.send(peliculasView.formularioNuevaPelicula(directores, "El director seleccionado no existe.", req.body))
        }
        const guardada = await peliculasService.savePelicula(datosPeliculaDesdeBody(req.body))
        res.send(peliculasView.detallePelicula(guardada, director))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function formularioEditarPelicula(req, res) {
    try {
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(peliculasView.pagina404())
        }
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
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(peliculasView.pagina404())
        }
        const directores = await directoresService.getDirectores()
        const error = validarDatosPelicula(req.body)
        if (error) {
            return res.send(peliculasView.formularioEditarPelicula({ ...req.body, _id: id }, directores, error))
        }
        const director = await directoresService.getDirectorById(req.body.directorId)
        if (!director) {
            return res.send(peliculasView.formularioEditarPelicula({ ...req.body, _id: id }, directores, "El director seleccionado no existe."))
        }
        await peliculasService.updatePelicula(id, datosPeliculaDesdeBody(req.body))
        const pelicula = await peliculasService.getPeliculaById(id)
        res.send(peliculasView.detallePelicula(pelicula, director))
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}

export async function formularioBorrarPelicula(req, res) {
    try {
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(peliculasView.pagina404())
        }
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
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(peliculasView.pagina404())
        }
        await peliculasService.deletePeliculaLogico(id)
        res.redirect("/peliculas")
    } catch (error) {
        res.status(404).send(peliculasView.pagina404())
    }
}