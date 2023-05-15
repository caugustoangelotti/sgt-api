import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddDisciplinaController, makeLoadDisciplinaController, makeUpdateDisciplinaController } from '../../main/factories/controllers'

import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/disciplina', adaptRoute(makeAddDisciplinaController()))
  router.get('/disciplinas', adaptRoute(makeLoadDisciplinaController()))
  router.patch('/disciplina', adaptRoute(makeUpdateDisciplinaController()))
}
