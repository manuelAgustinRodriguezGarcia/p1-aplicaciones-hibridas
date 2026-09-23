import * as peliculasService from "../services/peliculas.services.js"
import * as directoresService from "../services/directores.services.js"
import * as homeView from "../views/home.views.js"
import { pagina404 } from "../page/utils.js"

export async function getHome(req, res) {
    try {
        const peliculas = await peliculasService.getPeliculas()
        const directores = await directoresService.getDirectores()
        res.send(homeView.home(peliculas.slice(0, 5), directores.slice(0, 4)))
    } catch (error) {
        res.status(404).send(pagina404())
    }
}