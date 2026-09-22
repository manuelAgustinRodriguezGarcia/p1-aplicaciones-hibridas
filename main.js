import express from "express"
import peliculasRoutes from "./routes/peliculas.routes.js"
import peliculasApiRoutes from "./api/routes/peliculas.routes.js"
import directoresRoutes from "./routes/directores.routes.js"
import directoresApiRoutes from "./api/routes/directores.routes.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(peliculasRoutes)
app.use(peliculasApiRoutes)
app.use(directoresRoutes)
app.use(directoresApiRoutes)

app.listen(3333, () => {
    console.log("Servidor escuchando en http://localhost:3333")
})
