import * as directoresService from "../services/directores.services.js"
import * as directoresView from "../views/directores.views.js"

export async function getDirectores(req, res) {
    try {
        const directores = await directoresService.getDirectores()
        res.send(directoresView.listaDirectores(directores))
    } catch (error) {
        res.send(directoresView.pagina404())
    }
}

export async function getDirectorById(req, res) {
    try {
        const id = req.params?.id
        const director = await directoresService.getDirectorById(id)
        if (!director) {
            return res.send(directoresView.pagina404())
        }
        res.send(directoresView.detalleDirector(director))
    } catch (error) {
        res.send(directoresView.pagina404())
    }
}

export function formularioNuevoDirector(req, res) {
    try {
        res.send(directoresView.formularioNuevoDirector())
    } catch (error) {
        res.send(directoresView.pagina404())
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
        res.send(directoresView.detalleDirector(guardado))
    } catch (error) {
        res.send(directoresView.pagina404())
    }
}
