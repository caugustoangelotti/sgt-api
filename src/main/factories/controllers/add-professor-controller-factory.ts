import { makeDbAddProfessor } from '../../../main/factories/usecases/add-professor-factory'
import { makeLogControllerDecorator } from '../../../main/factories/decorators/log-controller-decorator-factory'
import type { Controller } from '../../../presentation/protocols'
import { AddProfessorController } from '../../../presentation/controllers/add-professor-controller'
import { makeAddProfessorValidation } from './add-professor-validation-factory'

export const makeAddProfessorController = (): Controller => {
  const controller = new AddProfessorController(makeAddProfessorValidation(), makeDbAddProfessor())
  return makeLogControllerDecorator(controller)
}
