import { Router } from "express"
import * as directoresController from "../controllers/directores.controller.js"

const router = Router()

router.get("/directores", directoresController.getDirectores)
router.get("/directores/nuevo", directoresController.formularioNuevoDirector)
router.post("/directores/nuevo", directoresController.saveDirector)
router.get("/directores/editar/:id", directoresController.formularioEditarDirector)
router.post("/directores/editar/:id", directoresController.updateDirector)
router.get("/directores/:id", directoresController.getDirectorById)

export default router
