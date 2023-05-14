import { LogControllerDecorator } from '../../../main/decorators'
import type { Controller } from '../../../presentation/protocols'
import { LogPostgresRepository } from '../../../infra/db'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
