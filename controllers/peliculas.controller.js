import * as peliculasService from "../services/peliculas.services.js"
import * as peliculasView from "../views/peliculas.views.js"

const generosValidos = ["accion", "comedia", "drama", "terror", "ciencia-ficcion"]

function datosPeliculaDesdeBody(body) {
    return {
        title: body.title,
        description: body.description,
        image: body.image,
        year: Number(body.year),
        genre: body.genre,
        trailer: body.trailer
    }
}

export async function getPeliculas(req, res) {
    try {
        const filtros = req.query
        const peliculas = await peliculasService.getPeliculas(filtros)
        const anios = await peliculasService.getAniosDisponibles()
        res.send(peliculasView.listaPeliculas(peliculas, filtros, anios))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function getPeliculasPorGenero(req, res) {
    try {
        const genero = req.params?.genero
        if (!generosValidos.includes(genero)) {
            return res.send(peliculasView.pagina404())
        }
        const peliculas = await peliculasService.getPeliculas({ genre: genero })
        res.send(peliculasView.listaPeliculasPorGenero(peliculas, genero))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function getPeliculaById(req, res) {
    try {
        const id = req.params?.id
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.send(peliculasView.pagina404())
        }
        res.send(peliculasView.detallePelicula(pelicula))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export function formularioNuevaPelicula(req, res) {
    try {
        res.send(peliculasView.formularioNuevaPelicula())
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function savePelicula(req, res) {
    try {
        const guardada = await peliculasService.savePelicula(datosPeliculaDesdeBody(req.body))
        res.send(peliculasView.detallePelicula(guardada))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function formularioEditarPelicula(req, res) {
    try {
        const id = req.params?.id
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.send(peliculasView.pagina404())
        }
        res.send(peliculasView.formularioEditarPelicula(pelicula))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function updatePelicula(req, res) {
    try {
        const id = req.params?.id
        const datos = datosPeliculaDesdeBody(req.body)
        await peliculasService.updatePelicula(id, datos)
        const pelicula = await peliculasService.getPeliculaById(id)
        res.send(peliculasView.detallePelicula(pelicula))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function formularioBorrarPelicula(req, res) {
    try {
        const id = req.params?.id
        const pelicula = await peliculasService.getPeliculaById(id)
        if (!pelicula || pelicula.eliminado === true) {
            return res.send(peliculasView.pagina404())
        }
        res.send(peliculasView.confirmacionBorrarPelicula(pelicula))
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}

export async function deletePelicula(req, res) {
    try {
        const id = req.params?.id
        await peliculasService.deletePeliculaLogico(id)
        res.redirect("/peliculas")
    } catch (error) {
        res.send(peliculasView.pagina404())
    }
}
