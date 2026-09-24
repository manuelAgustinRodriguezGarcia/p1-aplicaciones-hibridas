import { createPage, pagina404 } from "../page/utils.js"
import { movieCards } from "./peliculas.views.js"

export function directorCards(directores) {
    let html = ""
    html += "<div class=\"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\">"
    directores.forEach((director) => {
        html += "<div class=\"overflow-hidden rounded-xl border border-slate-800 bg-slate-900\">"
        html += `<a href="/directores/${director._id}">`
        html += `<div class="aspect-square bg-slate-800"><img src="${director.photo}" alt="${director.name}" class="h-full w-full object-cover"></div>`
        html += "<div class=\"p-4\">"
        html += `<h2 class="text-lg font-semibold text-slate-50">${director.name}</h2>`
        html += "<p class=\"mt-2 text-sm text-amber-500\">Ver director →</p>"
        html += "</div></a>"
        html += "</div>"
    })
    html += "</div>"
    return html
}

export function listaDirectores(directores) {
    let html = ""
    html += "<div class=\"mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between\">"
    html += "<div>"
    html += "<h1 class=\"text-3xl font-semibold text-slate-50\">Directores</h1>"
    html += "<p class=\"mt-2 text-slate-400\">Conocé a quienes están detrás de las películas.</p>"
    html += "</div>"
    html += "<a href=\"/directores/nuevo\" class=\"inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Agregar director</a>"
    html += "</div>"

    if (!directores.length) {
        html += "<p class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400\">No hay directores registrados.</p>"
        return createPage("Directores", html)
    }

    html += directorCards(directores)
    return createPage("Directores", html)
}

export function detalleDirector(director, peliculas = []) {
    let html = ""
    html += "<div class=\"grid gap-8 lg:grid-cols-[280px_1fr]\">"
    html += "<div class=\"overflow-hidden rounded-xl border border-slate-800 bg-slate-900\">"
    html += `<div class="aspect-square bg-slate-800"><img src="${director.photo}" alt="${director.name}" class="h-full w-full object-cover"></div>`
    html += "</div>"
    html += "<div>"
    html += `<h1 class="text-3xl font-semibold text-slate-50">${director.name}</h1>`
    html += `<p class="mt-6 text-slate-400">${director.description}</p>`
    html += "<div class=\"mt-8\">"
    html += "<a href=\"/directores\" class=\"rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-amber-400\">Volver al listado</a>"
    html += "</div></div></div>"
    html += "<section class=\"mt-12\">"
    html += "<h2 class=\"mb-6 text-2xl font-semibold text-slate-50\">Películas del director</h2>"
    if (!peliculas.length) {
        html += "<p class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400\">No hay películas registradas para este director.</p>"
    } else {
        html += movieCards(peliculas)
    }
    html += "</section>"
    return createPage(director.name, html)
}

export function formularioNuevoDirector() {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += "<h1 class=\"mb-2 text-3xl font-semibold text-slate-50\">Agregar director</h1>"
    html += "<p class=\"mb-8 text-slate-400\">Completá los datos para sumarlo al catálogo.</p>"
    html += "<form action=\"/directores/nuevo\" method=\"POST\" class=\"space-y-5 rounded-xl border border-slate-800 bg-slate-900 p-6\">"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Nombre</label>"
    html += `<input name="name" value="" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">URL de la foto</label>"
    html += `<input name="photo" type="url" value="" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Descripción</label>"
    html += `<textarea name="description" rows="4" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500"></textarea>`
    html += "</div>"
    html += "<button type=\"submit\" class=\"w-full rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Guardar director</button>"
    html += "</form>"
    html += "<a href=\"/directores\" class=\"mt-6 inline-block text-sm text-slate-400 hover:text-amber-400\">Volver al listado</a>"
    html += "</div>"
    return createPage("Agregar director", html)
}

export { pagina404 }