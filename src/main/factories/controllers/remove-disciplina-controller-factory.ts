import { makeLogControllerDecorator } from '../../../main/factories/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'
import { RemoveDisciplinaController } from '../../../presentation/controllers'
import { makeDbCheckDisciplinaById, makeDbRemoveDisciplina } from '../usecases'
import { makeRemoveDisciplinaValidation } from './remove-disciplina-validation-factory'

export const makeRemoveDisciplinaController = (): Controller => {
  const controller = new RemoveDisciplinaController(makeDbRemoveDisciplina(), makeDbCheckDisciplinaById(), makeRemoveDisciplinaValidation())
  return makeLogControllerDecorator(controller)
}
