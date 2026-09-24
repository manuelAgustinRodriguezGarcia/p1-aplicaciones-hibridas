import * as directoresService from "../services/directores.services.js"
import * as peliculasService from "../services/peliculas.services.js"
import * as directoresView from "../views/directores.views.js"

export async function getDirectores(req, res) {
    try {
        const directores = await directoresService.getDirectores()
        res.send(directoresView.listaDirectores(directores))
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}

export async function getDirectorById(req, res) {
    try {
        const id = req.params.id
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.status(404).send(directoresView.pagina404())
        }
        const peliculas = await peliculasService.getPeliculasByDirector(id)
        res.send(directoresView.detalleDirector(director, peliculas))
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}

export function formularioNuevoDirector(req, res) {
    try {
        res.send(directoresView.formularioNuevoDirector())
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
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
        res.send(directoresView.detalleDirector(guardado, []))
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}

export async function formularioEditarDirector(req, res) {
    try {
        const id = req.params.id
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.status(404).send(directoresView.pagina404())
        }
        res.send(directoresView.formularioEditarDirector(director))
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}

export async function updateDirector(req, res) {
    try {
        const id = req.params.id
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.status(404).send(directoresView.pagina404())
        }
        const datos = {
            name: req.body.name,
            photo: req.body.photo,
            description: req.body.description
        }
        await directoresService.updateDirector(id, datos)
        res.redirect("/peliculas/administrar")
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}
