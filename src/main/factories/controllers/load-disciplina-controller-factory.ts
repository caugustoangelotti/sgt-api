import { makeDbLoadDisciplina } from '../../../main/factories/usecases'
import { makeLogControllerDecorator } from '../../../main/factories/decorators'
import type { Controller } from '../../../presentation/protocols'
import { LoadDisciplinaController } from '../../../presentation/controllers'

export const makeLoadDisciplinaController = (): Controller => {
  const controller = new LoadDisciplinaController(makeDbLoadDisciplina())
  return makeLogControllerDecorator(controller)
}
