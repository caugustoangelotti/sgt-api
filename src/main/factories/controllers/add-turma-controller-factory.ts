import { makeLogControllerDecorator } from '../../../main/factories/decorators'
import type { Controller } from '../../../presentation/protocols'
import { makeAddTurmaValidation } from './add-turma-validation-factory'
import { makeDbAddTurma, makeDbCheckDisciplinaById, makeDbCheckProfessorById } from '../usecases'
import { AddTurmaController } from '../../../presentation/controllers'

export const makeAddTurmaController = (): Controller => {
  const controller = new AddTurmaController(makeDbAddTurma(), makeDbCheckProfessorById(), makeDbCheckDisciplinaById(), makeAddTurmaValidation())
  return makeLogControllerDecorator(controller)
}
