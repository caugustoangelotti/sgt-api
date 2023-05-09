import { makeLogControllerDecorator } from '../../../main/factories/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'
import { UpdateDisciplinaController } from '../../../presentation/controllers'
import { makeUpdateDisciplinaValidation } from './update-disciplina-validation-factory'
import { makeDbCheckDisciplinaById, makeDbUpdateDisciplina } from '../usecases'

export const makeUpdateDisciplinaController = (): Controller => {
  const controller = new UpdateDisciplinaController(makeUpdateDisciplinaValidation(), makeDbCheckDisciplinaById(), makeDbUpdateDisciplina())
  return makeLogControllerDecorator(controller)
}
