import { makeLogControllerDecorator } from '../../../main/factories/decorators'
import type { Controller } from '../../../presentation/protocols'
import { makeAddTurmaValidation } from './add-turma-validation-factory'
import { makeDbAddTurma } from '../usecases'
import { AddTurmaController } from '../../../presentation/controllers'

export const makeAddTurmaController = (): Controller => {
  const controller = new AddTurmaController(makeAddTurmaValidation(), makeDbAddTurma())
  return makeLogControllerDecorator(controller)
}
