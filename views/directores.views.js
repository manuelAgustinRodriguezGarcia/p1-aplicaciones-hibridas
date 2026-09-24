import {
    createPage,
    pagina404,
    btnPrimary,
    btnSecondarySm,
    btnPrimaryFull,
    ui,
    pageHeader,
} from "../page/utils.js"
import { movieCards } from "./peliculas.views.js"

export function directorCards(directores) {
    let html = ""
    html += "<div class=\"grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\">"
    directores.forEach((director) => {
        html += `<div class="${ui.cardInteractive} group">`
        html += `<a href="/directores/${director._id}" class="block">`
        html += `<div class="aspect-square overflow-hidden bg-slate-800"><img src="${director.photo}" alt="${director.name}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105"></div>`
        html += "<div class=\"p-4\">"
        html += `<h2 class="text-lg font-semibold text-slate-50">${director.name}</h2>`
        html += "<p class=\"mt-2 text-sm font-medium text-amber-400/90 group-hover:text-amber-300\">Ver director →</p>"
        html += "</div></a></div>"
    })
    html += "</div>"
    return html
}

export function listaDirectores(directores) {
    let html = ""
    html += "<div class=\"mb-10 flex flex-col gap-6 border-b border-slate-800/80 pb-8 sm:flex-row sm:items-end sm:justify-between\">"
    html += "<div>"
    html += `<h1 class="${ui.pageTitle}">Directores</h1>`
    html += `<p class="${ui.pageLead}">Conocé a quienes están detrás de las películas.</p>`
    html += "</div>"
    html += `<a href="/directores/nuevo" class="${btnPrimary}">Agregar director</a>`
    html += "</div>"

    if (!directores.length) {
        html += `<p class="${ui.empty}">No hay directores registrados.</p>`
        return createPage("Directores", html)
    }

    html += directorCards(directores)
    return createPage("Directores", html)
}

export function detalleDirector(director, peliculas = []) {
    let html = ""
    html += "<div class=\"grid gap-8 lg:grid-cols-[280px_1fr]\">"
    html += `<div class="${ui.card}">`
    html += `<div class="aspect-square bg-slate-800"><img src="${director.photo}" alt="${director.name}" class="h-full w-full object-cover"></div>`
    html += "</div>"
    html += "<div>"
    html += `<h1 class="${ui.pageTitle}">${director.name}</h1>`
    html += `<p class="mt-6 leading-relaxed text-slate-400">${director.description}</p>`
    html += `<div class="mt-8"><a href="/directores" class="${btnSecondarySm}">Volver al listado</a></div>`
    html += "</div></div>"
    html += "<section class=\"mt-14\">"
    html += `<h2 class="mb-6 ${ui.sectionTitle}">Películas del director</h2>`
    if (!peliculas.length) {
        html += `<p class="${ui.empty}">No hay películas registradas para este director.</p>`
    } else {
        html += movieCards(peliculas)
    }
    html += "</section>"
    return createPage(director.name, html)
}

export function formularioEditarDirector(director) {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += pageHeader("Editar director", "Modificá los datos y guardá los cambios.")
    html += `<form action="/directores/editar/${director._id}" method="POST" class="${ui.panel}">`
    html += "<div>"
    html += `<label class="${ui.label}">Nombre</label>`
    html += `<input name="name" value="${director.name}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">URL de la foto</label>`
    html += `<input name="photo" type="url" value="${director.photo}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Descripción</label>`
    html += `<textarea name="description" rows="4" required class="${ui.field}">${director.description}</textarea>`
    html += "</div>"
    html += `<button type="submit" class="${btnPrimaryFull}">Guardar cambios</button>`
    html += "</form>"
    html += `<a href="/peliculas/administrar" class="mt-6 inline-block ${ui.link}">← Volver a administrar</a>`
    html += "</div>"
    return createPage("Editar director", html)
}

export function formularioNuevoDirector() {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += pageHeader("Agregar director", "Completá los datos para sumarlo al catálogo.")
    html += `<form action="/directores/nuevo" method="POST" class="${ui.panel}">`
    html += "<div>"
    html += `<label class="${ui.label}">Nombre</label>`
    html += `<input name="name" value="" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">URL de la foto</label>`
    html += `<input name="photo" type="url" value="" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Descripción</label>`
    html += `<textarea name="description" rows="4" required class="${ui.field}"></textarea>`
    html += "</div>"
    html += `<button type="submit" class="${btnPrimaryFull}">Guardar director</button>`
    html += "</form>"
    html += `<a href="/directores" class="mt-6 inline-block ${ui.link}">← Volver al listado</a>`
    html += "</div>"
    return createPage("Agregar director", html)
}

export { pagina404 }
