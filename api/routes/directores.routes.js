import { Router } from "express"
import * as directoresController from "../controllers/directores.controller.js"

const router = Router()

router.get("/api/directores", directoresController.getDirectores)
router.get("/api/directores/:id/peliculas", directoresController.getPeliculasByDirector)
router.get("/api/directores/:id", directoresController.getDirectorById)
router.post("/api/directores", directoresController.saveDirector)

export default router
