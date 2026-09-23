import express from "express"
import homeRoutes from "./routes/home.routes.js"
import peliculasRoutes from "./routes/peliculas.routes.js"
import peliculasApiRoutes from "./api/routes/peliculas.routes.js"
import directoresRoutes from "./routes/directores.routes.js"
import directoresApiRoutes from "./api/routes/directores.routes.js"
import { pagina404 } from "./page/utils.js"

const app = express()

app.use("/", express.static("public", { index: false }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(homeRoutes)
app.use(peliculasRoutes)
app.use(peliculasApiRoutes)
app.use(directoresRoutes)
app.use(directoresApiRoutes)

app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ message: "Recurso no encontrado" })
    }
    res.status(404).send(pagina404())
})

app.listen(3333, () => {
    console.log("Servidor escuchando en http://localhost:3333")
})
