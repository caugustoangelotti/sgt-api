import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddTurmaController, makeLoadTurmaController } from '../../main/factories/controllers'

import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/turma', adaptRoute(makeAddTurmaController()))
  router.get('/turmas', adaptRoute(makeLoadTurmaController()))
}
