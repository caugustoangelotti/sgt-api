import { makeDbLoadProfessor } from '../../../main/factories/usecases'
import { makeLogControllerDecorator } from '../../../main/factories/decorators'
import type { Controller } from '../../../presentation/protocols'
import { LoadProfessorController } from '../../../presentation/controllers'

export const makeLoadProfessorController = (): Controller => {
  const controller = new LoadProfessorController(makeDbLoadProfessor())
  return makeLogControllerDecorator(controller)
}
