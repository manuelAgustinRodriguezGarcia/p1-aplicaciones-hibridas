import * as directoresService from "../services/directores.services.js"
import * as peliculasService from "../services/peliculas.services.js"
import * as directoresView from "../views/directores.views.js"

function campoVacio(valor) {
    return !valor || String(valor).trim() === ""
}

function idValido(id) {
    return typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id)
}

function validarDatosDirector(body) {
    if (campoVacio(body.name) || campoVacio(body.photo) || campoVacio(body.description)) {
        return "Completá todos los campos obligatorios."
    }
    return null
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
        const id = req.params?.id
        if (!idValido(id)) {
            return res.status(404).send(directoresView.pagina404())
        }
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
        const error = validarDatosDirector(req.body)
        if (error) {
            return res.send(directoresView.formularioNuevoDirector(error, req.body))
        }
        const director = {
            name: String(req.body.name).trim(),
            photo: String(req.body.photo).trim(),
            description: String(req.body.description).trim()
        }
        const guardado = await directoresService.saveDirector(director)
        res.send(directoresView.detalleDirector(guardado, []))
    } catch (error) {
        res.status(404).send(directoresView.pagina404())
    }
}