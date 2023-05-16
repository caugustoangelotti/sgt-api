import type { CheckProfessorById, RemoveProfessor } from '../../domain/usecases'
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
      return { statusCode: 400, body: error }
    }
    const exists = await this.checkProfessorById.checkById(request.id)
    if (!exists) {
      return { statusCode: 400, body: error }
    }
    return await Promise.resolve({ statusCode: 200, body: {} })
  }
}

export namespace RemoveProfessorController {
  export interface Request {
    id: number
  }
}