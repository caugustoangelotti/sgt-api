import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddDisciplinaController } from '../../main/factories/controllers'

import type { Router } from 'express'
import { cordenadorAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/disciplina', cordenadorAuth, adaptRoute(makeAddDisciplinaController()))
}
