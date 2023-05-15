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
        return badRequest(new InvalidParamError('id'))
      }
      const professor = {
        id: request.id
      }
      const fields = ['id', 'name', 'email', 'tempoIc']
      for (const field of fields) {
        if (request[field]) {
          professor[field] = request[field]
        }
      }
      const updatedProfessor = await this.updateProfessor.update(professor)
      return ok(updatedProfessor)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateProfessorController {
  export interface Request {
    id: number
    name?: string
    email?: string
    tempoIc?: number
  }
}
