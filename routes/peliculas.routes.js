import { Router } from "express"
import * as peliculasController from "../controllers/peliculas.controller.js"

const router = Router()

router.get("/peliculas", peliculasController.getPeliculas)
router.get("/peliculas/administrar", peliculasController.getAdministrar)
router.get("/peliculas/nueva", peliculasController.formularioNuevaPelicula)
router.post("/peliculas/nueva", peliculasController.savePelicula)
router.get("/peliculas/editar/:id", peliculasController.formularioEditarPelicula)
router.post("/peliculas/editar/:id", peliculasController.updatePelicula)
router.get("/peliculas/borrar/:id", peliculasController.formularioBorrarPelicula)
router.post("/peliculas/borrar/:id", peliculasController.deletePelicula)
router.get("/peliculas/genero/:genero", peliculasController.getPeliculasPorGenero)
router.get("/peliculas/:id", peliculasController.getPeliculaById)

export default router
