import { createPage, btnPrimary, btnSecondary, btnSecondarySm, ui } from "../page/utils.js"
import { movieCards } from "./peliculas.views.js"
import { directorCards } from "./directores.views.js"

function genreCard(href, title) {
    return `<a href="${href}" class="${ui.cardInteractive} group block p-6">
        <h3 class="text-lg font-semibold text-amber-400 transition group-hover:text-amber-300">${title}</h3>
        <p class="mt-2 text-sm text-slate-400">Ver películas →</p>
    </a>`
}

function adminCard(href, title, desc) {
    return `<a href="${href}" class="${ui.cardInteractive} group block p-6">
        <h3 class="font-semibold text-amber-400 group-hover:text-amber-300">${title}</h3>
        <p class="mt-2 text-sm text-slate-400">${desc}</p>
    </a>`
}

function urlHomePagina(param, pagina, query = {}, ancla = "") {
    const params = new URLSearchParams()
    params.set("peliculasPag", String(query.peliculasPag ?? 0))
    params.set("directoresPag", String(query.directoresPag ?? 0))
    params.set(param, String(pagina))
    const hash = ancla ? `#${ancla}` : ""
    return `/?${params.toString()}${hash}`
}

function controlesPaginaHome(meta, param, query, ancla) {
    if (!meta?.total || meta.totalPaginas <= 1) {
        return ""
    }
    const { pagina, totalPaginas, total, porPagina = 4 } = meta
    const desde = pagina * porPagina + 1
    const hasta = Math.min((pagina + 1) * porPagina, total)
    let html = ""
    html += "<div class=\"mt-6 flex flex-wrap items-center justify-between gap-4\">"
    html += `<p class="text-sm text-slate-500">Mostrando ${desde}–${hasta} de ${total}</p>`
    html += "<div class=\"flex flex-wrap items-center gap-2\">"
    if (pagina > 0) {
        html += `<a href="${urlHomePagina(param, pagina - 1, query, ancla)}" class="${btnSecondarySm}">← Anterior</a>`
    } else {
        html += `<span class="${btnSecondarySm} pointer-events-none opacity-40" aria-hidden="true">← Anterior</span>`
    }
    html += `<span class="min-w-[4.5rem] text-center text-sm text-slate-400">${pagina + 1} / ${totalPaginas}</span>`
    if (pagina < totalPaginas - 1) {
        html += `<a href="${urlHomePagina(param, pagina + 1, query, ancla)}" class="${btnSecondarySm}">Siguiente →</a>`
    } else {
        html += `<span class="${btnSecondarySm} pointer-events-none opacity-40" aria-hidden="true">Siguiente →</span>`
    }
    html += "</div></div>"
    return html
}

function scriptScrollSeccionHome() {
    return `<script>
(function () {
    if (!location.hash) return
    var id = location.hash.slice(1)
    function ir() {
        var el = document.getElementById(id)
        if (el) el.scrollIntoView({ block: "start", behavior: "instant" in window ? "instant" : "auto" })
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ir)
    } else {
        ir()
    }
    window.addEventListener("load", ir)
})()
</script>`
}

export function home(peliculas = [], directores = [], paginacion = {}) {
    const metaPeliculas = paginacion.peliculas ?? { pagina: 0, totalPaginas: 0, total: 0 }
    const metaDirectores = paginacion.directores ?? { pagina: 0, totalPaginas: 0, total: 0 }
    const query = paginacion.query ?? { peliculasPag: 0, directoresPag: 0 }
    let html = ""
    html += "<main>"
    html += "<section class=\"relative z-20 overflow-hidden border-b border-slate-800/80 bg-slate-950\">"
    html += "<img src=\"https://static.vecteezy.com/system/resources/previews/004/243/196/non_2x/cinema-concept-horizontal-banner-with-copy-space-vector.jpg\" alt=\"\" class=\"pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35\" aria-hidden=\"true\">"
    html += "<div class=\"absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/60\"></div>"
    html += "<div class=\"relative z-10 mx-auto flex min-h-[26rem] max-w-7xl items-center px-4 py-20 sm:min-h-[28rem] sm:px-6\">"
    html += "<div class=\"max-w-2xl\">"
    html += `<p class="mb-3 ${ui.kicker}">Tomi Manu Movies</p>`
    html += "<h1 class=\"font-serif text-3xl font-bold text-slate-50 sm:text-5xl\">Tu próxima película te está esperando.</h1>"
    html += "<p class=\"mt-4 text-lg text-slate-300\">Explorá nuestro catálogo de películas por género, año y director.</p>"
    html += "<div class=\"mt-8 flex flex-wrap gap-3\">"
    html += `<a href="/peliculas" class="${btnPrimary}">Explorar películas</a>`
    html += `<a href="/directores" class="${btnSecondary}">Ver directores</a>`
    html += "</div></div></div></section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-14 sm:px-6\">"
    html += "<div class=\"rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-10\">"
    html += `<p class="${ui.kicker}">Catálogo</p>`
    html += `<h2 class="mt-2 ${ui.sectionTitle}">Catálogo y filtros</h2>`
    html += `<p class="${ui.sectionLead}">Filtrá el catálogo por género y año desde el listado de películas.</p>`
    html += `<a href="/peliculas" class="mt-6 ${btnPrimary}">Ir al catálogo</a>`
    html += "</div></section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8\">"
    html += `<h2 class="${ui.sectionTitle}">Explorar por género</h2>`
    html += `<p class="${ui.sectionLead}">Cinco secciones dinámicas del catálogo.</p>`
    html += "<div class=\"mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5\">"
    html += genreCard("/peliculas/genero/accion", "Acción")
    html += genreCard("/peliculas/genero/comedia", "Comedia")
    html += genreCard("/peliculas/genero/drama", "Drama")
    html += genreCard("/peliculas/genero/terror", "Terror")
    html += genreCard("/peliculas/genero/ciencia-ficcion", "Ciencia ficción")
    html += "</div></section>"

    html += "<section id=\"home-peliculas\" class=\"mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6\">"
    html += "<div class=\"mb-8 flex flex-wrap items-end justify-between gap-4\">"
    html += "<div>"
    html += `<h2 class="${ui.sectionTitle}">Películas</h2>`
    html += `<p class="${ui.sectionLead}">Algunas películas del catálogo.</p>`
    html += "</div>"
    html += `<a href="/peliculas" class="${ui.link}">Ver todas →</a>`
    html += "</div>"
    if (!peliculas.length) {
        html += `<p class="${ui.empty}">No hay películas disponibles.</p>`
    } else {
        html += movieCards(peliculas)
        html += controlesPaginaHome(metaPeliculas, "peliculasPag", query, "home-peliculas")
    }
    html += "</section>"

    html += "<section id=\"home-directores\" class=\"mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6\">"
    html += "<div class=\"mb-8 flex flex-wrap items-end justify-between gap-4\">"
    html += "<div>"
    html += `<h2 class="${ui.sectionTitle}">Directores</h2>`
    html += `<p class="${ui.sectionLead}">Algunos directores del catálogo.</p>`
    html += "</div>"
    html += `<a href="/directores" class="${ui.link}">Ver todos →</a>`
    html += "</div>"
    if (!directores.length) {
        html += `<p class="${ui.empty}">No hay directores registrados.</p>`
    } else {
        html += directorCards(directores)
        html += controlesPaginaHome(metaDirectores, "directoresPag", query, "home-directores")
    }
    html += "</section>"

    html += "<section class=\"mx-auto max-w-7xl px-4 pb-16 sm:px-6\">"
    html += `<h2 class="${ui.sectionTitle}">Administración</h2>`
    html += `<p class="${ui.sectionLead}">Acceso al ABM de películas y al alta de directores.</p>`
    html += "<div class=\"mt-8 grid gap-4 sm:grid-cols-3\">"
    html += adminCard("/peliculas/administrar", "Administrar catálogo", "Películas y directores en un solo panel.")
    html += adminCard("/peliculas/nueva", "Agregar película", "Cargar un nuevo título.")
    html += adminCard("/directores/nuevo", "Agregar director", "Cargar un nuevo director.")
    html += "</div></section>"
    html += scriptScrollSeccionHome()
    html += "</main>"

    return createPage("Tomi Manu Movies", html, true)
}
