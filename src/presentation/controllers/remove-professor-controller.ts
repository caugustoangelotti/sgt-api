import type { CheckProfessorById, RemoveProfessor } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class RemoveProfessorController implements Controller {
  constructor (
    private readonly removeProfessor: RemoveProfessor,
    private readonly checkProfessorById: CheckProfessorById,
    private readonly validation: Validation
  ) {}

  async handle (request: RemoveProfessorController.Request): Promise<HttpResponse> {
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
  }
}

export namespace RemoveProfessorController {
  export interface Request {
    id: number
  }
}
