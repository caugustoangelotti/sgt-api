import { makeLogControllerDecorator } from '../../../main/factories/decorators'
import type { Controller } from '../../../presentation/protocols'
import { makeAddTurmaValidation } from './add-turma-validation-factory'
import { makeDbAddTurma, makeDbGetDisciplinaById, makeDbGetProfessorById } from '../usecases'
import { AddTurmaController } from '../../../presentation/controllers'

export const makeAddTurmaController = (): Controller => {
  const controller = new AddTurmaController(makeDbAddTurma(), makeDbGetProfessorById(), makeDbGetDisciplinaById(), makeAddTurmaValidation())
  return makeLogControllerDecorator(controller)
}
