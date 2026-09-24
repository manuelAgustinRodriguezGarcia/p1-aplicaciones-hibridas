import * as directoresService from "../services/directores.services.js"
import * as peliculasService from "../services/peliculas.services.js"
import * as directoresView from "../views/directores.views.js"

function idValido(id) {
    return typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id)
}

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
            name: String(req.body.name).trim(),
            photo: String(req.body.photo).trim(),
            description: String(req.body.description).trim(),
        }
        const guardado = await directoresService.saveDirector(director)
        res.send(directoresView.detalleDirector(guardado, []))
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}

export async function formularioEditarDirector(req, res) {
    try {
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(directoresView.pagina404())
        }
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
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(directoresView.pagina404())
        }
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.status(404).send(directoresView.pagina404())
        }
        const datos = {
            name: String(req.body.name).trim(),
            photo: String(req.body.photo).trim(),
            description: String(req.body.description).trim(),
        }
        await directoresService.updateDirector(id, datos)
        res.redirect("/peliculas/administrar")
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}