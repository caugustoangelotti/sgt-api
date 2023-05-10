import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddDisciplinaController, makeLoadDisciplinaController, makeUpdateDisciplinaController } from '../../main/factories/controllers'

import type { Router } from 'express'
import { cordenadorAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/disciplina', cordenadorAuth, adaptRoute(makeAddDisciplinaController()))
  router.get('/disciplinas', cordenadorAuth, adaptRoute(makeLoadDisciplinaController()))
  router.patch('/disciplina', cordenadorAuth, adaptRoute(makeUpdateDisciplinaController()))
}
