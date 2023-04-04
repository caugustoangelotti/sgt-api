import express, { type Express } from 'express'
import setupRoutes from '../../main/config/routes'
import setupMiddlewares from '../../main/config/middlewares'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
