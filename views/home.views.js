import { createPage } from "../page/utils.js"
import { movieCards } from "./peliculas.views.js"
import { directorCards } from "./directores.views.js"

export function home(peliculas = [], directores = []) {
    let html = ""
    html += "<main>"
    html += "<section class=\"relative z-20 overflow-hidden border-b border-slate-800 bg-slate-950\">"
    html += "<img src=\"https://static.vecteezy.com/system/resources/previews/004/243/196/non_2x/cinema-concept-horizontal-banner-with-copy-space-vector.jpg\" alt=\"\" class=\"pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40\" aria-hidden=\"true\">"
    html += "<div class=\"absolute inset-0 bg-slate-950/70\"></div>"
    html += "<div class=\"relative z-10 mx-auto flex min-h-[26rem] max-w-7xl items-center px-4 py-20 sm:min-h-[28rem]\">"
    html += "<div class=\"max-w-2xl\">"
    html += "<p class=\"mb-3 text-sm uppercase tracking-[0.2em] text-amber-500\">Tomi Manu Movies</p>"
    html += "<h1 class=\"text-3xl font-semibold text-slate-50 sm:text-5xl\">Tu próxima película te está esperando.</h1>"
    html += "<p class=\"mt-4 text-slate-300\">Explorá nuestro catálogo de películas por género, año y director.</p>"
    html += "<div class=\"mt-8 flex flex-wrap gap-3\">"
    html += "<a href=\"/peliculas\" class=\"rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Explorar películas</a>"
    html += "<a href=\"/directores\" class=\"rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2 text-slate-200 hover:text-amber-400\">Ver directores</a>"
    html += "</div></div></div></section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-12\">"
    html += "<h2 class=\"text-2xl font-semibold text-slate-50\">Catálogo y filtros</h2>"
    html += "<p class=\"mt-2 text-slate-400\">Filtrá el catálogo por género y año desde el listado de películas.</p>"
    html += "<a href=\"/peliculas\" class=\"mt-6 inline-flex rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Ir al catálogo</a>"
    html += "</section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-12\">"
    html += "<h2 class=\"text-2xl font-semibold text-slate-50\">Explorar por género</h2>"
    html += "<p class=\"mt-2 text-slate-400\">Cinco secciones dinámicas del catálogo.</p>"
    html += "<div class=\"mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5\">"
    html += "<a href=\"/peliculas/genero/accion\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500\"><h3 class=\"text-lg font-semibold text-amber-500\">Acción</h3><p class=\"mt-2 text-sm text-slate-400\">Ver películas</p></a>"
    html += "<a href=\"/peliculas/genero/comedia\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500\"><h3 class=\"text-lg font-semibold text-amber-500\">Comedia</h3><p class=\"mt-2 text-sm text-slate-400\">Ver películas</p></a>"
    html += "<a href=\"/peliculas/genero/drama\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500\"><h3 class=\"text-lg font-semibold text-amber-500\">Drama</h3><p class=\"mt-2 text-sm text-slate-400\">Ver películas</p></a>"
    html += "<a href=\"/peliculas/genero/terror\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500\"><h3 class=\"text-lg font-semibold text-amber-500\">Terror</h3><p class=\"mt-2 text-sm text-slate-400\">Ver películas</p></a>"
    html += "<a href=\"/peliculas/genero/ciencia-ficcion\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500\"><h3 class=\"text-lg font-semibold text-amber-500\">Ciencia ficción</h3><p class=\"mt-2 text-sm text-slate-400\">Ver películas</p></a>"
    html += "</div></section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-12\">"
    html += "<div class=\"mb-6 flex items-end justify-between gap-4\">"
    html += "<div>"
    html += "<h2 class=\"text-2xl font-semibold text-slate-50\">Películas</h2>"
    html += "<p class=\"mt-2 text-slate-400\">Algunas películas del catálogo.</p>"
    html += "</div>"
    html += "<a href=\"/peliculas\" class=\"text-sm text-amber-500 hover:text-amber-400\">Ver todas</a>"
    html += "</div>"
    if (!peliculas.length) {
        html += "<p class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400\">No hay películas disponibles.</p>"
    } else {
        html += movieCards(peliculas)
    }
    html += "</section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-12\">"
    html += "<div class=\"mb-6 flex items-end justify-between gap-4\">"
    html += "<div>"
    html += "<h2 class=\"text-2xl font-semibold text-slate-50\">Directores</h2>"
    html += "<p class=\"mt-2 text-slate-400\">Algunos directores del catálogo.</p>"
    html += "</div>"
    html += "<a href=\"/directores\" class=\"text-sm text-amber-500 hover:text-amber-400\">Ver todos</a>"
    html += "</div>"
    if (!directores.length) {
        html += "<p class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400\">No hay directores registrados.</p>"
    } else {
        html += directorCards(directores)
    }
    html += "</section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-12\">"
    html += "<h2 class=\"text-2xl font-semibold text-slate-50\">Administración</h2>"
    html += "<p class=\"mt-2 text-slate-400\">Acceso al ABM de películas y al alta de directores.</p>"
    html += "<div class=\"mt-8 grid gap-4 sm:grid-cols-3\">"
    html += "<a href=\"/peliculas/administrar\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-amber-500\"><h3 class=\"font-semibold text-amber-500\">Administrar películas</h3><p class=\"mt-2 text-sm text-slate-400\">Listado, edición y eliminación.</p></a>"
    html += "<a href=\"/peliculas/nueva\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-amber-500\"><h3 class=\"font-semibold text-amber-500\">Agregar película</h3><p class=\"mt-2 text-sm text-slate-400\">Cargar un nuevo título.</p></a>"
    html += "<a href=\"/directores/nuevo\" class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-amber-500\"><h3 class=\"font-semibold text-amber-500\">Agregar director</h3><p class=\"mt-2 text-sm text-slate-400\">Cargar un nuevo director.</p></a>"
    html += "</div></section>"
    html += "</main>"

    return createPage("Tomi Manu Movies", html, true)
}