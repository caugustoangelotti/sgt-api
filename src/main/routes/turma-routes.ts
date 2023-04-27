import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeAddTurmaController } from '../../main/factories/controllers'

import type { Router } from 'express'

export default (router: Router): void => {
  router.post('/turma', adaptRoute(makeAddTurmaController()))
}
