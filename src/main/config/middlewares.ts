import { bodyParser, badJsonErrorHandler, cors, contentType, noCache } from '../../main/middlewares'

import type { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(badJsonErrorHandler)
  app.use(cors)
  app.use(contentType)
  app.use(noCache)
}
