export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += `<title>${title}</title>`
    html += '<script src="https://cdn.tailwindcss.com"></script>'
    html += "</head><body class=\"min-h-screen bg-slate-950 text-slate-50\">"
    html += "<header class=\"border-b border-slate-800 bg-slate-900\">"
    html += "<nav class=\"mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4\">"
    html += "<a href=\"/\" class=\"text-lg font-semibold text-amber-500\">Tomi Manu Movies</a>"
    html += "<div class=\"flex flex-wrap gap-4 text-sm text-slate-300\">"
    html += "<a href=\"/\" class=\"hover:text-amber-400\">Inicio</a>"
    html += "<a href=\"/peliculas\" class=\"hover:text-amber-400\">Películas</a>"
    html += "<a href=\"/peliculas/nueva\" class=\"hover:text-amber-400\">Agregar</a>"
    html += "</div></nav></header>"
    html += "<main class=\"mx-auto max-w-7xl px-4 py-8\">"
    html += content
    html += "</main>"
    html += "<footer class=\"border-t border-slate-800 bg-slate-900\">"
    html += "<div class=\"mx-auto max-w-7xl px-4 py-6 text-sm text-slate-400\">Tomi Manu Movies</div>"
    html += "</footer></body></html>"
    return html
}
