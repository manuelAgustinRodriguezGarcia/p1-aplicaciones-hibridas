import * as peliculasService from "../services/peliculas.services.js"
import * as directoresService from "../services/directores.services.js"
import * as homeView from "../views/home.views.js"
import { pagina404 } from "../page/utils.js"

const PELICULAS_POR_PAGINA = 5
const DIRECTORES_POR_PAGINA = 4

function paginaDesdeQuery(valor) {
    const n = Number.parseInt(String(valor ?? "0"), 10)
    return Number.isFinite(n) && n >= 0 ? n : 0
}

function recortarPagina(items, pagina, porPagina) {
    const totalPaginas = Math.max(1, Math.ceil(items.length / porPagina) || 1)
    const paginaValida = Math.min(pagina, totalPaginas - 1)
    const inicio = paginaValida * porPagina
    return {
        items: items.slice(inicio, inicio + porPagina),
        pagina: paginaValida,
        totalPaginas: items.length ? totalPaginas : 0,
        total: items.length,
    }
}

export async function getHome(req, res) {
    try {
        const [todasPeliculas, todosDirectores] = await Promise.all([
            peliculasService.getPeliculas(),
            directoresService.getDirectores(),
        ])

        const peliculasPag = paginaDesdeQuery(req.query.peliculasPag)
        const directoresPag = paginaDesdeQuery(req.query.directoresPag)

        const peliculasMeta = recortarPagina(todasPeliculas, peliculasPag, PELICULAS_POR_PAGINA)
        const directoresMeta = recortarPagina(todosDirectores, directoresPag, DIRECTORES_POR_PAGINA)

        res.send(
            homeView.home(peliculasMeta.items, directoresMeta.items, {
                peliculas: {
                    pagina: peliculasMeta.pagina,
                    totalPaginas: peliculasMeta.totalPaginas,
                    total: peliculasMeta.total,
                    porPagina: PELICULAS_POR_PAGINA,
                },
                directores: {
                    pagina: directoresMeta.pagina,
                    totalPaginas: directoresMeta.totalPaginas,
                    total: directoresMeta.total,
                    porPagina: DIRECTORES_POR_PAGINA,
                },
                query: {
                    peliculasPag: peliculasMeta.pagina,
                    directoresPag: directoresMeta.pagina,
                },
            })
        )
    } catch (error) {
        res.status(404).send(pagina404())
    }
}