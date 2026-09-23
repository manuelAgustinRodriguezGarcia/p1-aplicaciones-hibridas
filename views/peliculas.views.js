import { createPage, pagina404 } from "../page/utils.js"

const generosEtiqueta = {
    accion: "Acción",
    comedia: "Comedia",
    drama: "Drama",
    terror: "Terror",
    "ciencia-ficcion": "Ciencia ficción"
}

const generosOpciones = [
    { value: "accion", label: "Acción" },
    { value: "comedia", label: "Comedia" },
    { value: "drama", label: "Drama" },
    { value: "terror", label: "Terror" },
    { value: "ciencia-ficcion", label: "Ciencia ficción" }
]

function etiquetaGenero(genero) {
    return generosEtiqueta[genero] || genero
}

function opcionesGenero(seleccionado) {
    let html = ""
    generosOpciones.forEach((opcion) => {
        const selected = opcion.value === seleccionado ? " selected" : ""
        html += `<option value="${opcion.value}"${selected}>${opcion.label}</option>`
    })
    return html
}

function opcionesAnio(anios, seleccionado) {
    let html = ""
    anios.forEach((anio) => {
        const selected = String(anio) === String(seleccionado) ? " selected" : ""
        html += `<option value="${anio}"${selected}>${anio}</option>`
    })
    return html
}

function opcionesDirector(directores, seleccionado) {
    let html = ""
    html += `<option value=""${!seleccionado ? " selected" : ""} disabled>Seleccioná un director</option>`
    directores.forEach((director) => {
        const selected = String(director._id) === String(seleccionado) ? " selected" : ""
        html += `<option value="${director._id}"${selected}>${director.name}</option>`
    })
    return html
}

export function movieCards(peliculas, mostrarAcciones = true) {
    let html = ""
    html += "<div class=\"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5\">"
    peliculas.forEach((pelicula) => {
        html += "<div class=\"overflow-hidden rounded-xl border border-slate-800 bg-slate-900\">"
        html += `<a href="/peliculas/${pelicula._id}">`
        html += `<div class="aspect-[2/3] bg-slate-800"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-full w-full object-cover"></div>`
        html += "<div class=\"p-3\">"
        html += `<h2 class="line-clamp-2 text-sm font-semibold text-slate-50">${pelicula.title}</h2>`
        html += `<p class="mt-1 text-xs text-amber-500">${etiquetaGenero(pelicula.genre)}</p>`
        html += `<p class="mt-1 text-xs text-slate-400">${pelicula.year}</p>`
        html += "</div></a>"
        if (mostrarAcciones) {
            html += "<div class=\"flex gap-2 border-t border-slate-800 p-3\">"
            html += `<a href="/peliculas/editar/${pelicula._id}" class="flex-1 rounded-lg bg-amber-500 px-2 py-1.5 text-center text-xs font-medium text-slate-950 hover:bg-amber-400">Editar</a>`
            html += `<a href="/peliculas/borrar/${pelicula._id}" class="flex-1 rounded-lg bg-red-600 px-2 py-1.5 text-center text-xs font-medium text-slate-50 hover:bg-red-500">Eliminar</a>`
            html += "</div>"
        }
        html += "</div>"
    })
    html += "</div>"
    return html
}

function formularioFiltros(filtros = {}, anios = []) {
    let html = ""
    html += "<form action=\"/peliculas\" method=\"GET\" class=\"mb-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:grid-cols-3\">"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Género</label>"
    html += "<select name=\"genre\" class=\"w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500\">"
    html += `<option value=\"\"${!filtros.genre ? " selected" : ""}>Todos los géneros</option>`
    html += opcionesGenero(filtros.genre)
    html += "</select>"
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Año</label>"
    html += "<select name=\"year\" class=\"w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500\">"
    html += `<option value=\"\"${!filtros.year ? " selected" : ""}>Todos los años</option>`
    html += opcionesAnio(anios, filtros.year)
    html += "</select>"
    html += "</div>"
    html += "<div class=\"flex items-end\">"
    html += "<button type=\"submit\" class=\"w-full rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Filtrar</button>"
    html += "</div>"
    html += "</form>"
    return html
}

export function listaPeliculas(peliculas, filtros = {}, anios = []) {
    let html = ""
    html += "<div class=\"mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between\">"
    html += "<div>"
    html += "<h1 class=\"text-3xl font-semibold text-slate-50\">Películas</h1>"
    html += "<p class=\"mt-2 text-slate-400\">Explorá el catálogo completo.</p>"
    html += "</div>"
    html += "<a href=\"/peliculas/nueva\" class=\"inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Agregar película</a>"
    html += "</div>"
    html += formularioFiltros(filtros, anios)

    if (!peliculas.length) {
        const mensaje = filtros.genre || filtros.year
            ? "No hay películas disponibles con esos filtros."
            : "No hay películas disponibles."
        html += `<p class="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">${mensaje}</p>`
        return createPage("Películas", html)
    }

    html += movieCards(peliculas)
    return createPage("Películas", html)
}

export function listaPeliculasPorGenero(peliculas, genero) {
    const titulo = `Películas de ${etiquetaGenero(genero)}`
    let html = ""
    html += "<div class=\"mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between\">"
    html += "<div>"
    html += `<h1 class="text-3xl font-semibold text-slate-50">${titulo}</h1>`
    html += "<p class=\"mt-2 text-slate-400\">Sección dinámica por género.</p>"
    html += "</div>"
    html += "<a href=\"/peliculas\" class=\"inline-flex items-center justify-center rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:text-amber-400\">Volver al catálogo</a>"
    html += "</div>"

    if (!peliculas.length) {
        html += "<p class=\"rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400\">No hay películas disponibles en esta categoría.</p>"
        return createPage(titulo, html)
    }

    html += movieCards(peliculas)
    return createPage(titulo, html)
}

export function detallePelicula(pelicula, director = null) {
    let html = ""
    html += "<div class=\"grid gap-8 lg:grid-cols-[280px_1fr]\">"
    html += "<div class=\"overflow-hidden rounded-xl border border-slate-800 bg-slate-900\">"
    html += `<div class="aspect-[2/3] bg-slate-800"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-full w-full object-cover"></div>`
    html += "</div>"
    html += "<div>"
    html += `<h1 class="text-3xl font-semibold text-slate-50">${pelicula.title}</h1>`
    html += `<p class="mt-3 text-amber-500">${etiquetaGenero(pelicula.genre)} · ${pelicula.year}</p>`
    if (director) {
        html += `<p class="mt-3 text-slate-300">Director: <a href="/directores/${director._id}" class="text-amber-500 hover:text-amber-400">${director.name}</a></p>`
    } else {
        html += "<p class=\"mt-3 text-slate-400\">Director: Sin director asignado</p>"
    }
    html += `<p class="mt-6 text-slate-400">${pelicula.description}</p>`
    if (pelicula.trailer) {
        html += `<a href="${pelicula.trailer}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400">Ver tráiler</a>`
    }
    html += "<div class=\"mt-8 flex flex-wrap gap-3\">"
    html += `<a href="/peliculas/editar/${pelicula._id}" class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400">Editar</a>`
    html += `<a href="/peliculas/borrar/${pelicula._id}" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-red-500">Eliminar</a>`
    html += "<a href=\"/peliculas\" class=\"rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-amber-400\">Volver al listado</a>"
    html += "</div></div></div>"
    return createPage(pelicula.title, html)
}

export function formularioNuevaPelicula(directores = [], error = "", valores = {}) {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += "<h1 class=\"mb-2 text-3xl font-semibold text-slate-50\">Agregar película</h1>"
    html += "<p class=\"mb-8 text-slate-400\">Completá los datos para sumarla al catálogo.</p>"
    if (error) {
        html += `<p class="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4 text-amber-500">${error}</p>`
    }
    html += "<form action=\"/peliculas/nueva\" method=\"POST\" class=\"space-y-5 rounded-xl border border-slate-800 bg-slate-900 p-6\">"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Título</label>"
    html += `<input name="title" value="${valores.title || ""}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Descripción</label>"
    html += `<textarea name="description" rows="4" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">${valores.description || ""}</textarea>`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">URL del póster</label>"
    html += `<input name="image" type="url" value="${valores.image || ""}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Año</label>"
    html += `<input name="year" type="number" value="${valores.year || ""}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Género</label>"
    html += "<select name=\"genre\" required class=\"w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500\">"
    html += opcionesGenero(valores.genre)
    html += "</select>"
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Director</label>"
    html += "<select name=\"directorId\" required class=\"w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500\">"
    html += opcionesDirector(directores, valores.directorId)
    html += "</select>"
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">URL del tráiler</label>"
    html += `<input name="trailer" type="url" value="${valores.trailer || ""}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<button type=\"submit\" class=\"w-full rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Guardar película</button>"
    html += "</form>"
    html += "<a href=\"/peliculas\" class=\"mt-6 inline-block text-sm text-slate-400 hover:text-amber-400\">Volver al listado</a>"
    html += "</div>"
    return createPage("Agregar película", html)
}

export function formularioEditarPelicula(pelicula, directores = [], error = "") {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += "<h1 class=\"mb-2 text-3xl font-semibold text-slate-50\">Editar película</h1>"
    html += "<p class=\"mb-8 text-slate-400\">Modificá los datos y guardá los cambios.</p>"
    if (error) {
        html += `<p class="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4 text-amber-500">${error}</p>`
    }
    html += `<form action="/peliculas/editar/${pelicula._id}" method="POST" class="space-y-5 rounded-xl border border-slate-800 bg-slate-900 p-6">`
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Título</label>"
    html += `<input name="title" value="${pelicula.title}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Descripción</label>"
    html += `<textarea name="description" rows="4" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">${pelicula.description}</textarea>`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">URL del póster</label>"
    html += `<input name="image" type="url" value="${pelicula.image}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Año</label>"
    html += `<input name="year" type="number" value="${pelicula.year}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Género</label>"
    html += "<select name=\"genre\" required class=\"w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500\">"
    html += opcionesGenero(pelicula.genre)
    html += "</select>"
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">Director</label>"
    html += "<select name=\"directorId\" required class=\"w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500\">"
    html += opcionesDirector(directores, pelicula.directorId)
    html += "</select>"
    html += "</div>"
    html += "<div>"
    html += "<label class=\"mb-2 block text-sm text-slate-300\">URL del tráiler</label>"
    html += `<input name="trailer" type="url" value="${pelicula.trailer || ""}" required class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-50 outline-none focus:border-amber-500">`
    html += "</div>"
    html += "<button type=\"submit\" class=\"w-full rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 hover:bg-amber-400\">Guardar cambios</button>"
    html += "</form>"
    html += "<a href=\"/peliculas\" class=\"mt-6 inline-block text-sm text-slate-400 hover:text-amber-400\">Volver al listado</a>"
    html += "</div>"
    return createPage("Editar película", html)
}

export function confirmacionBorrarPelicula(pelicula) {
    let html = ""
    html += "<div class=\"mx-auto max-w-xl\">"
    html += "<h1 class=\"mb-2 text-3xl font-semibold text-slate-50\">Eliminar película</h1>"
    html += `<p class="mb-8 text-slate-400">¿Confirmás eliminar <span class="text-slate-50">${pelicula.title}</span>?</p>`
    html += "<div class=\"overflow-hidden rounded-xl border border-slate-800 bg-slate-900\">"
    html += `<div class="mx-auto aspect-[2/3] max-w-xs bg-slate-800"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-full w-full object-cover"></div>`
    html += "<div class=\"p-6\">"
    html += `<h2 class="text-xl font-semibold text-slate-50">${pelicula.title}</h2>`
    html += `<form action="/peliculas/borrar/${pelicula._id}" method="POST" class="mt-6 flex flex-wrap gap-3">`
    html += "<button type=\"submit\" class=\"rounded-lg bg-red-600 px-4 py-2 font-medium text-slate-50 hover:bg-red-500\">Eliminar</button>"
    html += "<a href=\"/peliculas\" class=\"rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:text-amber-400\">Cancelar</a>"
    html += "</form>"
    html += "</div></div></div>"
    return createPage("Eliminar película", html)
}

export { pagina404 }
