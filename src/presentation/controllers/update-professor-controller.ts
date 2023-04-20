import type { UpdateProfessor } from '../../domain/usecases'
import { badRequest, noContent, ok, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateProfessorController implements Controller {
  constructor (
    private readonly updateProfessor: UpdateProfessor,
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateProfessorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const professor = await this.updateProfessor.update(request)
      if (professor) {
        return ok(professor)
      }
      return noContent()
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
