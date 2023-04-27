import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddProfessorController, makeLoadProfessorController, makeUpdateProfessorController } from '../../main/factories/controllers'

import type { Router } from 'express'
import { adminAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/professor', adminAuth, adaptRoute(makeAddProfessorController()))
  router.get('/professor', adminAuth, adaptRoute(makeLoadProfessorController()))
  router.patch('/professor', adminAuth, adaptRoute(makeUpdateProfessorController()))
}
