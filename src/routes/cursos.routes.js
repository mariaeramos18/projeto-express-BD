// Routes: define as URLs e os métodos HTTP que direcionam cada requisição para um Controller.

import { Router } from 'express'
import cursoController from '../controllers/CursoController.js'

const router = Router()

router.post('/', cursoController.store.bind(cursoController)) /// .bind: Garante que o "this" do método continue apontando para o Controller.
router.get('/', cursoController.index.bind(cursoController))
router.get('/:id', cursoController.show.bind(cursoController))
router.put('/:id', cursoController.update.bind(cursoController))
router.delete('/:id', cursoController.delete.bind(cursoController))

export default router