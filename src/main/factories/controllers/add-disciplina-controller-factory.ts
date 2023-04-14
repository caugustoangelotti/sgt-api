import { makeDbAddDisciplina } from '../../../main/factories/usecases'
import { makeLogControllerDecorator } from '../../../main/factories/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'
import { AddDisciplinaController } from '../../../presentation/controllers'
import { makeAddDisciplinaValidation } from './add-disciplina-validation-factory'

export const makeAddDisciplinaController = (): Controller => {
  const controller = new AddDisciplinaController(makeAddDisciplinaValidation(), makeDbAddDisciplina())
  return makeLogControllerDecorator(controller)
}
