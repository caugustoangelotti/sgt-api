import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddTurmaController, makeLoadTurmaController } from '../../main/factories/controllers'

import type { Router } from 'express'
import { cordenadorAuth } from '../middlewares'

export default (router: Router): void => {
  router.post('/turma', cordenadorAuth, adaptRoute(makeAddTurmaController()))
  router.get('/turmas', cordenadorAuth, adaptRoute(makeLoadTurmaController()))
}
