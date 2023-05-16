import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddProfessorController, makeLoadProfessorController, makeRemoveProfessorController, makeUpdateProfessorController } from '../../main/factories/controllers'

import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/professor', adaptRoute(makeAddProfessorController()))
  router.get('/professores', adaptRoute(makeLoadProfessorController()))
  router.patch('/professor', adaptRoute(makeUpdateProfessorController()))
  router.delete('/professor', adaptRoute(makeRemoveProfessorController()))
}
