import { makeLogControllerDecorator } from '../../../main/factories/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'
import { UpdateProfessorController } from '../../../presentation/controllers'
import { makeDbCheckProfessorById, makeDbUpdateProfessor } from '../usecases'
import { makeUpdateProfessorValidation } from './update-professor-validation-factory'

export const makeUpdateProfessorController = (): Controller => {
  const controller = new UpdateProfessorController(makeDbUpdateProfessor(), makeUpdateProfessorValidation(), makeDbCheckProfessorById())
  return makeLogControllerDecorator(controller)
}
