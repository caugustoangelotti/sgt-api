import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddDisciplinaController } from '../../main/factories/controllers'

import type { Router } from 'express'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/disciplina', adminAuth, adaptRoute(makeAddDisciplinaController()))
}
