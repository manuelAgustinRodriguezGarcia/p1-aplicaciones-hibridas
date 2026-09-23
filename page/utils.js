const CINE_PATTERN_URL =
    "https://img.magnific.com/vector-gratis/patrones-fisuras-elementos-cine_225004-1155.jpg?semt=ais_hybrid&w=740&q=80"

export function createPage(title, content, anchoCompleto = false) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += `<title>${title}</title>`
    html += '<script src="https://cdn.tailwindcss.com"></script>'
    html += "</head><body class=\"relative min-h-screen bg-slate-950 text-slate-50\">"
    html += "<div class=\"pointer-events-none fixed inset-0 z-0\" aria-hidden=\"true\">"
    html += `<div class="absolute inset-0 bg-repeat opacity-25" style="background-image: url('${CINE_PATTERN_URL}'); background-size: 740px auto;"></div>`
    html += "<div class=\"absolute inset-0 bg-slate-950/75\"></div></div>"
    html += "<header class=\"relative z-10 border-b border-slate-800 bg-slate-900\">"
    html += "<nav class=\"mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4\">"
    html += "<a href=\"/\" class=\"text-lg font-semibold text-amber-500\">Tomi Manu Movies</a>"
    html += "<div class=\"flex flex-wrap gap-4 text-sm text-slate-300\">"
    html += "<a href=\"/\" class=\"hover:text-amber-400\">Inicio</a>"
    html += "<a href=\"/peliculas\" class=\"hover:text-amber-400\">Películas</a>"
    html += "<a href=\"/directores\" class=\"hover:text-amber-400\">Directores</a>"
    html += "<a href=\"/peliculas\" class=\"hover:text-amber-400\">Administrar</a>"
    html += "</div></nav></header>"
    if (anchoCompleto) {
        html += `<div class="relative z-10">${content}</div>`
    } else {
        html += "<main class=\"relative z-10 mx-auto max-w-7xl px-4 py-8\">"
        html += content
        html += "</main>"
    }
    html += "<footer class=\"relative z-10 border-t border-slate-800\">"
    html += "<div class=\"mx-auto max-w-7xl px-4 py-6 text-sm text-slate-400\">Tomi Manu Movies</div>"
    html += "</footer></body></html>"
    return html
}

export function pagina404() {
    let html = ""
    html += "<div class=\"rounded-xl border border-slate-800 bg-slate-900 p-8\">"
    html += "<h1 class=\"text-2xl font-semibold text-slate-50\">Página no encontrada</h1>"
    html += "<p class=\"mt-3 text-slate-400\">El recurso que buscás no existe o el identificador no es válido.</p>"
    html += "<a href=\"/\" class=\"mt-6 inline-block text-amber-500 hover:text-amber-400\">Volver al inicio</a>"
    html += "</div>"
    return createPage("No encontrada", html)
}