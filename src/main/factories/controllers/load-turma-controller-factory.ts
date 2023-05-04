import { makeDbLoadTurma } from '../../../main/factories/usecases'
import { makeLogControllerDecorator } from '../../../main/factories/decorators'
import type { Controller } from '../../../presentation/protocols'
import { LoadTurmaController } from '../../../presentation/controllers'

export const makeLoadTurmaController = (): Controller => {
  const controller = new LoadTurmaController(makeDbLoadTurma())
  return makeLogControllerDecorator(controller)
}
