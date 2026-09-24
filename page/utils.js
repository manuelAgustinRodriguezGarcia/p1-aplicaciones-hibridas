const CINE_PATTERN_URL =
    "https://img.magnific.com/vector-gratis/patrones-fisuras-elementos-cine_225004-1155.jpg?semt=ais_hybrid&w=740&q=80"

const btnGold =
    "rounded-xl border border-amber-400/45 bg-amber-400 font-semibold text-red-950 shadow-md shadow-black/25 transition hover:border-amber-300 hover:bg-amber-300"

export const ui = {
    pageTitle: "text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl",
    pageLead: "mt-2 max-w-2xl text-base text-slate-400",
    sectionTitle: "text-2xl font-bold tracking-tight text-slate-50",
    sectionLead: "mt-2 text-sm text-slate-400",
    kicker: "text-xs font-semibold uppercase tracking-[0.22em] text-amber-400",
    card: "overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/90 shadow-lg shadow-black/25 backdrop-blur-sm",
    cardInteractive:
        "overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/90 shadow-lg shadow-black/25 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-500/35 hover:shadow-amber-500/10",
    panel: "space-y-5 rounded-2xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-lg shadow-black/25 backdrop-blur-sm sm:p-8",
    empty: "rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 p-8 text-center text-slate-400",
    label: "mb-2 block text-sm font-medium text-slate-300",
    field: "w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2.5 text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
    link: "text-sm font-medium text-amber-400 transition hover:text-amber-300",
    badge: "inline-flex rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/30",
}

export const btnPrimary = `inline-flex items-center justify-center ${btnGold} px-4 py-2.5`
export const btnPrimaryFull = `inline-flex w-full items-center justify-center ${btnGold} px-4 py-2.5`
export const btnPrimarySm = `inline-flex items-center justify-center ${btnGold} px-3 py-1.5 text-center text-xs`
export const btnSecondary =
    "inline-flex items-center justify-center rounded-xl border border-slate-700/90 bg-slate-950/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-amber-500/40 hover:bg-slate-900 hover:text-amber-300"
export const btnSecondarySm =
    "inline-flex items-center justify-center rounded-xl border border-slate-700/90 px-4 py-2 text-center text-sm text-slate-400 transition hover:border-amber-500/40 hover:text-amber-300"
export const btnDanger =
    "rounded-xl border border-red-800/80 bg-red-950 px-4 py-2.5 font-semibold text-red-100 transition hover:border-red-600 hover:bg-red-900"
export const btnDangerSm = `inline-flex items-center justify-center ${btnDanger} px-3 py-1.5 text-center text-xs`

export function pageHeader(title, subtitle = "") {
    let html = `<header class="mb-8 border-b border-slate-800/80 pb-6">`
    html += `<h1 class="${ui.pageTitle}">${title}</h1>`
    if (subtitle) {
        html += `<p class="${ui.pageLead}">${subtitle}</p>`
    }
    html += "</header>"
    return html
}

export function sectionBlock(title, subtitle = "") {
    let html = `<div class="mb-6">`
    html += `<h2 class="${ui.sectionTitle}">${title}</h2>`
    if (subtitle) {
        html += `<p class="${ui.sectionLead}">${subtitle}</p>`
    }
    html += "</div>"
    return html
}

export function createPage(title, content, anchoCompleto = false) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += `<title>${title}</title>`
    html += '<script src="https://cdn.tailwindcss.com"></script>'
    html += "</head><body class=\"relative flex min-h-screen flex-col bg-slate-950 text-slate-50 antialiased selection:bg-amber-500/25 selection:text-amber-100\">"
    html += "<div class=\"pointer-events-none fixed inset-0 z-0\" aria-hidden=\"true\">"
    html += `<div class="absolute inset-0 bg-repeat opacity-20" style="background-image: url('${CINE_PATTERN_URL}'); background-size: 740px auto;"></div>`
    html += "<div class=\"absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95\"></div></div>"
    html += "<header class=\"sticky top-0 z-20 border-b border-red-950/50 bg-slate-900/95 shadow-[0_4px_24px_rgba(0,0,0,0.45)] backdrop-blur-md\">"
    html += "<div class=\"mx-auto max-w-7xl px-4\">"
    html += "<nav class=\"flex min-h-[4.25rem] flex-col items-stretch justify-center gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0\">"
    html += "<a href=\"/\" class=\"group inline-flex items-center\">"
    html += "<span>"
    html += "<span class=\"block font-serif text-base font-bold leading-tight tracking-tight text-amber-400 transition group-hover:text-amber-300 sm:text-lg\">Tomi Manu Movies</span>"
    html += "<span class=\"block text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 group-hover:text-slate-400\">Tu cartelera online</span>"
    html += "</span></a>"
    html += "<div class=\"flex flex-wrap items-center gap-1 rounded-2xl border border-slate-800/90 bg-slate-950/80 p-1.5 shadow-inner shadow-black/20 md:gap-0.5\">"
    html += "<a href=\"/\" class=\"rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-amber-300 md:px-4\">Inicio</a>"
    html += "<a href=\"/peliculas\" class=\"rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-amber-300 md:px-4\">Películas</a>"
    html += "<a href=\"/directores\" class=\"rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-amber-300 md:px-4\">Directores</a>"
    html += "<span class=\"mx-1 hidden h-5 w-px bg-slate-700 md:block\" aria-hidden=\"true\"></span>"
    html += "<a href=\"/peliculas/administrar\" class=\"rounded-xl border border-amber-500/35 bg-amber-500/15 px-3.5 py-2 text-sm font-semibold text-amber-400 transition hover:border-amber-400/55 hover:bg-amber-500/25 hover:text-amber-300 md:px-4\">Administrar</a>"
    html += "</div></nav></div>"
    html += "<div class=\"h-px bg-gradient-to-r from-transparent via-amber-500/45 to-transparent\" aria-hidden=\"true\"></div>"
    html += "</header>"
    if (anchoCompleto) {
        html += `<div class="relative z-10 flex-1">${content}</div>`
    } else {
        html += "<main class=\"relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12\">"
        html += content
        html += "</main>"
    }
    html += "<footer class=\"relative z-10 mt-auto border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-sm\">"
    html += "<div class=\"mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6\">"
    html += "<span class=\"font-serif font-semibold text-amber-400/90\">Tomi Manu Movies</span>"
    html += "<span class=\"text-sm text-slate-500\">Explorá películas, directores y géneros</span>"
    html += "</div></footer></body></html>"
    return html
}

export function pagina404() {
    let html = ""
    html += `<div class="${ui.panel} max-w-lg">`
    html += "<h1 class=\"text-2xl font-bold text-slate-50\">Página no encontrada</h1>"
    html += "<p class=\"mt-3 text-slate-400\">El recurso que buscás no existe o el identificador no es válido.</p>"
    html += `<a href="/" class="mt-6 ${btnPrimary}">Volver al inicio</a>`
    html += "</div>"
    return createPage("No encontrada", html)
}
