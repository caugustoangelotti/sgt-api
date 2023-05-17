import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddDisciplinaController, makeLoadDisciplinaController, makeRemoveDisciplinaController, makeUpdateDisciplinaController } from '../../main/factories/controllers'

import type { Router } from 'express'
import { cordenadorAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/disciplina', adaptRoute(makeAddDisciplinaController()))
  router.get('/disciplinas', cordenadorAuth, adaptRoute(makeLoadDisciplinaController()))
  router.patch('/disciplina', adaptRoute(makeUpdateDisciplinaController()))
  router.delete('/disciplina', adaptRoute(makeRemoveDisciplinaController()))
}
