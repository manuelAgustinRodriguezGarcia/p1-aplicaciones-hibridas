import { Router } from "express"
import * as peliculasController from "../controllers/peliculas.controller.js"

const router = Router()

router.get("/api/peliculas", peliculasController.getPeliculas)
router.get("/api/peliculas/:id", peliculasController.getPeliculaById)
router.post("/api/peliculas", peliculasController.savePelicula)
router.patch("/api/peliculas/:id", peliculasController.updatePelicula)
router.delete("/api/peliculas/:id", peliculasController.deletePelicula)

export default router
