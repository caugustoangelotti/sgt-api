import type { CheckProfessorById, UpdateProfessor } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateProfessorController implements Controller {
  constructor (
    private readonly updateProfessor: UpdateProfessor,
    private readonly validation: Validation,
    private readonly checkProfessorById: CheckProfessorById
  ) {}

  async handle (request: UpdateProfessorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.checkProfessorById.checkById(request.id)
      if (!exists) {
        return badRequest(new InvalidParamError('surveyId'))
      }
      const updatedProfessor = await this.updateProfessor.update(request)
      return ok(updatedProfessor)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateProfessorController {
  export interface Request {
    id: string
    name?: string
    email?: string
    tempoIc?: number
  }
}
