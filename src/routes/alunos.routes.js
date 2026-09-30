// Routes: define as URLs e os métodos HTTP que direcionam cada requisição para um Controller.

import { Router } from 'express'
import alunoController from '../controllers/AlunoController.js'

const router = Router()

router.post('/', alunoController.store.bind(alunoController)) /// .bind: Garante que o "this" do método continue apontando para o Controller.
router.get('/', alunoController.index.bind(alunoController))
router.get('/:id', alunoController.show.bind(alunoController))
router.put('/:id', alunoController.update.bind(alunoController))
router.delete('/:id', alunoController.delete.bind(alunoController))

export default router