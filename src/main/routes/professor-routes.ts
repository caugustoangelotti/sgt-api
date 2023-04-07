import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddProfessorController } from '../../main/factories/controllers/add-professor-controller-factory'

import type { Router } from 'express'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/professor', adminAuth, adaptRoute(makeAddProfessorController()))
}
