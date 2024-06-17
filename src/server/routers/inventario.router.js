import { Router } from 'express'
import * as inventarioController from '../controllers/inventario.controller.js'

const router = Router()

router.get('/joyas', inventarioController.findAllHateoas)
router.get('/joyas/filtros', inventarioController.filterfindAll)
router.get('/joyas/:id', inventarioController.findById)
router.post('/joyas', inventarioController.createJewel)
router.put('/joyas/:id', inventarioController.updateById)
router.delete('/joyas/:id', inventarioController.deleteById)

export default router
