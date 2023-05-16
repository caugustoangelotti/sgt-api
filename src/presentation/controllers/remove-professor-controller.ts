import type { CheckProfessorById, RemoveProfessor } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class RemoveProfessorController implements Controller {
  constructor (
    private readonly removeProfessor: RemoveProfessor,
    private readonly checkProfessorById: CheckProfessorById,
    private readonly validation: Validation
  ) {}

  async handle (request: RemoveProfessorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.checkProfessorById.checkById(request.id)
      if (!exists) {
        return badRequest(new InvalidParamError('id'))
      }
      await this.removeProfessor.remove(request.id)
      return await Promise.resolve({ statusCode: 200, body: {} })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RemoveProfessorController {
  export interface Request {
    id: number
  }
}
