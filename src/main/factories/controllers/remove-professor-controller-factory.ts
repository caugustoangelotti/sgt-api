import { makeLogControllerDecorator } from '../../../main/factories/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'
import { RemoveProfessorController } from '../../../presentation/controllers'
import { makeDbCheckProfessorById, makeDbRemoveProfessor } from '../usecases'
import { makeRemoveProfessorValidation } from './remove-professor-validation-factory'

export const makeRemoveProfessorController = (): Controller => {
  const controller = new RemoveProfessorController(makeDbRemoveProfessor(), makeDbCheckProfessorById(), makeRemoveProfessorValidation())
  return makeLogControllerDecorator(controller)
}
