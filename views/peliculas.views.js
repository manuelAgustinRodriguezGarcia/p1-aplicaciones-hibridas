import {
    createPage,
    pagina404,
    btnPrimary,
    btnSecondary,
    btnSecondarySm,
    btnPrimaryFull,
    btnPrimarySm,
    btnDanger,
    btnDangerSm,
    ui,
    pageHeader,
} from "../page/utils.js"

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

function trailerEmbedUrl(trailer) {
    if (!trailer || typeof trailer !== "string") {
        return null
    }
    try {
        const url = new URL(trailer.trim())
        if (url.hostname.includes("youtube.com")) {
            const id = url.searchParams.get("v")
            if (id) {
                return `https://www.youtube.com/embed/${id}`
            }
            const parts = url.pathname.split("/").filter(Boolean)
            if (parts[0] === "embed" && parts[1]) {
                return `https://www.youtube.com/embed/${parts[1]}`
            }
        }
        if (url.hostname === "youtu.be") {
            const id = url.pathname.replace(/^\//, "")
            if (id) {
                return `https://www.youtube.com/embed/${id}`
            }
        }
    } catch {
        return null
    }
    return null
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

const OTRO_DIRECTOR = "otro"

function opcionesDirector(directores, seleccionado) {
    let html = ""
    const esOtro = seleccionado === OTRO_DIRECTOR
    html += `<option value=""${!seleccionado && !esOtro ? " selected" : ""} disabled>Seleccioná un director</option>`
    directores.forEach((director) => {
        const selected = !esOtro && String(director._id) === String(seleccionado) ? " selected" : ""
        html += `<option value="${director._id}"${selected}>${director.name}</option>`
    })
    html += `<option value="${OTRO_DIRECTOR}"${esOtro ? " selected" : ""}>Otro</option>`
    return html
}

function campoDirectorEnFormulario(directores, seleccionado, nombreOtro = "") {
    const mostrarOtro = seleccionado === OTRO_DIRECTOR
    let html = ""
    html += "<div>"
    html += `<label class="${ui.label}">Director</label>`
    html += `<select id="directorId" name="directorId" class="${ui.field}"${mostrarOtro ? "" : " required"}>`
    html += opcionesDirector(directores, seleccionado)
    html += "</select>"
    html += `<div id="directorOtroWrap" class="mt-3${mostrarOtro ? "" : " hidden"}">`
    html += `<label class="${ui.label}" for="directorName">Nombre del director</label>`
    html += `<input id="directorName" name="directorName" type="text" value="${nombreOtro}" placeholder="Nombre y apellido" class="${ui.field}"${mostrarOtro ? " required" : ""}>`
    html += "</div></div>"
    return html
}

function scriptDirectorOtro() {
    return `<script>
(function () {
    const select = document.getElementById("directorId")
    const wrap = document.getElementById("directorOtroWrap")
    const input = document.getElementById("directorName")
    if (!select || !wrap || !input) return
    function actualizar() {
        const otro = select.value === "${OTRO_DIRECTOR}"
        wrap.classList.toggle("hidden", !otro)
        input.required = otro
        select.required = !otro
    }
    select.addEventListener("change", actualizar)
    actualizar()
})()
</script>`
}

export function movieCards(peliculas) {
    let html = ""
    html += "<div class=\"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5\">"
    peliculas.forEach((pelicula) => {
        html += `<div class="${ui.cardInteractive} group">`
        html += `<a href="/peliculas/${pelicula._id}" class="block">`
        html += `<div class="aspect-[2/3] overflow-hidden bg-slate-800"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-full w-full object-cover transition duration-300 group-hover:scale-105"></div>`
        html += "<div class=\"p-3.5\">"
        html += `<h2 class="line-clamp-2 text-sm font-semibold text-slate-50">${pelicula.title}</h2>`
        html += `<p class="mt-2"><span class="${ui.badge}">${etiquetaGenero(pelicula.genre)}</span></p>`
        html += `<p class="mt-2 text-xs text-slate-500">${pelicula.year}</p>`
        html += "</div></a>"
        html += "</div>"
    })
    html += "</div>"
    return html
}

function formularioFiltros(filtros = {}, anios = []) {
    let html = ""
    html += `<form action="/peliculas" method="GET" class="mb-10 grid gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/90 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:grid-cols-3 sm:p-6">`
    html += "<div>"
    html += `<label class="${ui.label}">Género</label>`
    html += `<select name="genre" class="${ui.field}">`
    html += `<option value=\"\"${!filtros.genre ? " selected" : ""}>Todos los géneros</option>`
    html += opcionesGenero(filtros.genre)
    html += "</select>"
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Año</label>`
    html += `<select name="year" class="${ui.field}">`
    html += `<option value=\"\"${!filtros.year ? " selected" : ""}>Todos los años</option>`
    html += opcionesAnio(anios, filtros.year)
    html += "</select>"
    html += "</div>"
    html += "<div class=\"flex items-end\">"
    html += `<button type="submit" class="${btnPrimaryFull}">Filtrar</button>`
    html += "</div>"
    html += "</form>"
    return html
}

export function listaPeliculas(peliculas, filtros = {}, anios = []) {
    let html = ""
    html += pageHeader("Películas", "Explorá el catálogo completo.")
    html += formularioFiltros(filtros, anios)

    if (!peliculas.length) {
        const mensaje = filtros.genre || filtros.year
            ? "No hay películas disponibles con esos filtros."
            : "No hay películas disponibles."
        html += `<p class="${ui.empty}">${mensaje}</p>`
        return createPage("Películas", html)
    }

    html += movieCards(peliculas)
    return createPage("Películas", html)
}

function resumenDescripcion(texto, max = 80) {
    if (!texto || typeof texto !== "string") {
        return "—"
    }
    const limpio = texto.trim()
    if (limpio.length <= max) {
        return limpio
    }
    return `${limpio.slice(0, max)}…`
}

export function panelAdministrar(peliculas, directores = []) {
    let html = ""
    html += "<div class=\"mb-10 border-b border-slate-800/80 pb-8\">"
    html += `<h1 class="${ui.pageTitle}">Administrar</h1>`
    html += `<p class="${ui.pageLead}">Gestioná películas y directores del catálogo desde un solo lugar.</p>`
    html += "</div>"

    html += "<section class=\"mb-16\">"
    html += "<div class=\"mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between\">"
    html += "<div>"
    html += `<h2 class="${ui.sectionTitle}">Películas</h2>`
    html += `<p class="${ui.sectionLead}">Alta, edición y eliminación de películas.</p>`
    html += "</div>"
    html += `<a href="/peliculas/nueva" class="${btnPrimary}">Agregar película</a>`
    html += "</div>"

    if (!peliculas.length) {
        html += `<p class="${ui.empty}">No hay películas disponibles.</p>`
    } else {
        html += `<div class="overflow-x-auto ${ui.card}">`
        html += "<table class=\"w-full text-left text-sm\">"
        html += "<thead class=\"border-b border-slate-800/80 bg-slate-950/80 text-slate-300\">"
        html += "<tr>"
        html += "<th class=\"px-4 py-3 font-medium\">Póster</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Título</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Género</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Año</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Acciones</th>"
        html += "</tr></thead><tbody>"

        peliculas.forEach((pelicula) => {
            html += "<tr class=\"border-b border-slate-800 last:border-0\">"
            html += `<td class="px-4 py-3"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-16 w-11 rounded object-cover"></td>`
            html += `<td class="px-4 py-3 font-medium text-slate-50">${pelicula.title}</td>`
            html += `<td class="px-4 py-3"><span class="${ui.badge}">${etiquetaGenero(pelicula.genre)}</span></td>`
            html += `<td class="px-4 py-3 text-slate-400">${pelicula.year}</td>`
            html += "<td class=\"px-4 py-3\">"
            html += "<div class=\"flex flex-wrap gap-2\">"
            html += `<a href="/peliculas/editar/${pelicula._id}" class="${btnPrimarySm}">Editar</a>`
            html += `<a href="/peliculas/borrar/${pelicula._id}" class="${btnDangerSm}">Eliminar</a>`
            html += "</div></td></tr>"
        })

        html += "</tbody></table></div>"
    }
    html += "</section>"

    html += "<section>"
    html += "<div class=\"mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between\">"
    html += "<div>"
    html += `<h2 class="${ui.sectionTitle}">Directores</h2>`
    html += `<p class="${ui.sectionLead}">Modificá nombre, foto y descripción de cada director.</p>`
    html += "</div>"
    html += `<a href="/directores/nuevo" class="${btnSecondary}">Agregar director</a>`
    html += "</div>"

    if (!directores.length) {
        html += `<p class="${ui.empty}">No hay directores registrados.</p>`
    } else {
        html += `<div class="overflow-x-auto ${ui.card}">`
        html += "<table class=\"w-full text-left text-sm\">"
        html += "<thead class=\"border-b border-slate-800/80 bg-slate-950/80 text-slate-300\">"
        html += "<tr>"
        html += "<th class=\"px-4 py-3 font-medium\">Foto</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Nombre</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Descripción</th>"
        html += "<th class=\"px-4 py-3 font-medium\">Acciones</th>"
        html += "</tr></thead><tbody>"

        directores.forEach((director) => {
            html += "<tr class=\"border-b border-slate-800 last:border-0\">"
            html += `<td class="px-4 py-3"><img src="${director.photo}" alt="${director.name}" class="h-14 w-14 rounded-lg object-cover"></td>`
            html += `<td class="px-4 py-3 font-medium text-slate-50">${director.name}</td>`
            html += `<td class="max-w-xs px-4 py-3 text-slate-400">${resumenDescripcion(director.description)}</td>`
            html += "<td class=\"px-4 py-3\">"
            html += `<a href="/directores/editar/${director._id}" class="${btnPrimarySm}">Editar</a>`
            html += "</td></tr>"
        })

        html += "</tbody></table></div>"
    }
    html += "</section>"

    return createPage("Administrar", html)
}

export function listaPeliculasPorGenero(peliculas, genero) {
    const titulo = `Películas de ${etiquetaGenero(genero)}`
    let html = ""
    html += "<div class=\"mb-10 flex flex-col gap-6 border-b border-slate-800/80 pb-8 sm:flex-row sm:items-end sm:justify-between\">"
    html += "<div>"
    html += `<h1 class="${ui.pageTitle}">${titulo}</h1>`
    html += `<p class="${ui.pageLead}">Sección dinámica por género.</p>`
    html += "</div>"
    html += "<div class=\"flex flex-wrap gap-3\">"
    html += `<a href="/peliculas/nueva" class="${btnPrimary}">Agregar película</a>`
    html += `<a href="/peliculas" class="${btnSecondary}">Volver al catálogo</a>`
    html += "</div></div>"

    if (!peliculas.length) {
        html += `<p class="${ui.empty}">No hay películas disponibles en esta categoría.</p>`
        return createPage(titulo, html)
    }

    html += movieCards(peliculas)
    return createPage(titulo, html)
}

function fichaDato(etiqueta, valor) {
    return `<div class="grid grid-cols-[5.5rem_1fr] gap-2 border-b border-slate-800/70 py-2.5 text-sm last:border-0"><span class="font-semibold text-slate-400">${etiqueta}</span><span class="text-slate-200">${valor}</span></div>`
}

export function detallePelicula(pelicula, director = null) {
    const embedTrailer = trailerEmbedUrl(pelicula.trailer)
    const directorHtml = director
        ? `<a href="/directores/${director._id}" class="${ui.link}">${director.name}</a>`
        : "Sin director asignado"

    let html = ""
    html += "<article class=\"grid items-start gap-8 lg:grid-cols-[minmax(240px,300px)_1fr] lg:gap-10\">"

    html += "<div class=\"space-y-4\">"
    html += `<div class="${ui.card} mx-auto w-full max-w-[280px] shadow-xl shadow-black/40 lg:mx-0 lg:max-w-none">`
    html += `<div class="aspect-[2/3] bg-slate-800"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-full w-full object-cover"></div>`
    html += "</div>"
    html += `<div class="${ui.card} p-4 sm:p-5">`
    html += `<h1 class="mb-4 font-serif text-xl font-bold leading-tight text-slate-50 sm:text-2xl">${pelicula.title}</h1>`
    html += fichaDato("Género", etiquetaGenero(pelicula.genre))
    html += fichaDato("Año", String(pelicula.year))
    html += fichaDato("Director", directorHtml)
    html += "<div class=\"mt-5 flex flex-wrap gap-2 border-t border-slate-800/70 pt-4\">"
    html += `<a href="/peliculas/editar/${pelicula._id}" class="${btnPrimarySm}">Editar</a>`
    html += `<a href="/peliculas/borrar/${pelicula._id}" class="${btnDangerSm}">Eliminar</a>`
    html += `<a href="/peliculas" class="${btnSecondarySm}">Volver</a>`
    html += "</div></div></div>"

    html += "<div class=\"flex min-w-0 flex-col gap-6\">"
    html += `<section class="${ui.panel} space-y-4 !p-5 sm:!p-6">`
    html += `<h2 class="text-sm font-semibold uppercase tracking-wider text-amber-400/90">Sinopsis</h2>`
    html += `<p class="text-justify text-sm leading-relaxed text-slate-300 sm:text-base">${pelicula.description}</p>`
    html += "</section>"
    html += `<section class="${ui.card} p-4 sm:p-5">`
    html += "<div class=\"mb-3 flex items-center justify-between gap-2\">"
    html += "<h2 class=\"text-sm font-semibold uppercase tracking-wider text-amber-400/90\">Tráiler</h2>"
    if (pelicula.trailer && !embedTrailer) {
        html += `<a href="${pelicula.trailer}" target="_blank" rel="noopener noreferrer" class="${ui.link}">Abrir en YouTube →</a>`
    }
    html += "</div>"
    if (embedTrailer) {
        html += `<div class="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-black">`
        html += `<iframe src="${embedTrailer}" title="Tráiler de ${pelicula.title}" class="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`
        html += "</div>"
    } else if (pelicula.trailer) {
        html += `<p class="rounded-lg border border-dashed border-slate-700 p-4 text-center text-sm text-slate-400">No se pudo incrustar este tráiler.</p>`
    } else {
        html += `<p class="rounded-lg border border-dashed border-slate-700 p-4 text-center text-sm text-slate-400">Esta película no tiene tráiler cargado.</p>`
    }
    html += "</section></div></article>"
    return createPage(pelicula.title, html)
}

export function formularioNuevaPelicula(directores = [], valores = {}) {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += pageHeader("Agregar película", "Completá los datos para sumarla al catálogo.")
    html += `<form action="/peliculas/nueva" method="POST" class="${ui.panel}">`
    html += "<div>"
    html += `<label class="${ui.label}">Título</label>`
    html += `<input name="title" value="${valores.title || ""}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Descripción</label>`
    html += `<textarea name="description" rows="4" required class="${ui.field}">${valores.description || ""}</textarea>`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">URL del póster</label>`
    html += `<input name="image" type="url" value="${valores.image || ""}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Año</label>`
    html += `<input name="year" type="number" value="${valores.year || ""}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Género</label>`
    html += `<select name="genre" required class="${ui.field}">`
    html += opcionesGenero(valores.genre)
    html += "</select>"
    html += "</div>"
    html += campoDirectorEnFormulario(directores, valores.directorId, valores.directorName || "")
    html += "<div>"
    html += `<label class="${ui.label}">URL del tráiler</label>`
    html += `<input name="trailer" type="url" value="${valores.trailer || ""}" required class="${ui.field}">`
    html += "</div>"
    html += `<button type="submit" class="${btnPrimaryFull}">Guardar película</button>`
    html += "</form>"
    html += scriptDirectorOtro()
    html += `<a href="/peliculas/administrar" class="mt-6 inline-block ${ui.link}">← Volver al listado</a>`
    html += "</div>"
    return createPage("Agregar película", html)
}

export function formularioEditarPelicula(pelicula, directores = []) {
    let html = ""
    html += "<div class=\"mx-auto max-w-2xl\">"
    html += pageHeader("Editar película", "Modificá los datos y guardá los cambios.")
    html += `<form action="/peliculas/editar/${pelicula._id}" method="POST" class="${ui.panel}">`
    html += "<div>"
    html += `<label class="${ui.label}">Título</label>`
    html += `<input name="title" value="${pelicula.title}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Descripción</label>`
    html += `<textarea name="description" rows="4" required class="${ui.field}">${pelicula.description}</textarea>`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">URL del póster</label>`
    html += `<input name="image" type="url" value="${pelicula.image}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Año</label>`
    html += `<input name="year" type="number" value="${pelicula.year}" required class="${ui.field}">`
    html += "</div>"
    html += "<div>"
    html += `<label class="${ui.label}">Género</label>`
    html += `<select name="genre" required class="${ui.field}">`
    html += opcionesGenero(pelicula.genre)
    html += "</select>"
    html += "</div>"
    html += campoDirectorEnFormulario(
        directores,
        pelicula.directorId,
        pelicula.directorName || ""
    )
    html += "<div>"
    html += `<label class="${ui.label}">URL del tráiler</label>`
    html += `<input name="trailer" type="url" value="${pelicula.trailer}" required class="${ui.field}">`
    html += "</div>"
    html += `<button type="submit" class="${btnPrimaryFull}">Guardar cambios</button>`
    html += "</form>"
    html += scriptDirectorOtro()
    html += `<a href="/peliculas/administrar" class="mt-6 inline-block ${ui.link}">← Volver al listado</a>`
    html += "</div>"
    return createPage("Editar película", html)
}

export function confirmacionBorrarPelicula(pelicula) {
    let html = ""
    html += "<div class=\"mx-auto max-w-xl\">"
    html += pageHeader("Eliminar película", `¿Confirmás eliminar <span class="text-slate-100">${pelicula.title}</span>?`)
    html += `<div class="${ui.card}">`
    html += `<div class="mx-auto aspect-[2/3] max-w-xs bg-slate-800"><img src="${pelicula.image}" alt="${pelicula.title}" class="h-full w-full object-cover"></div>`
    html += "<div class=\"p-6\">"
    html += `<h2 class="text-xl font-bold text-slate-50">${pelicula.title}</h2>`
    html += `<form action="/peliculas/borrar/${pelicula._id}" method="POST" class="mt-6 flex flex-wrap gap-3">`
    html += `<button type="submit" class="${btnDanger}">Eliminar</button>`
    html += `<a href="/peliculas/administrar" class="${btnSecondary}">Cancelar</a>`
    html += "</form>"
    html += "</div></div></div>"
    return createPage("Eliminar película", html)
}

export { pagina404 }
