import type { CheckDisciplinaById, RemoveDisciplina } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, noContent, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class RemoveDisciplinaController implements Controller {
  constructor (
    private readonly removeDisicplina: RemoveDisciplina,
    private readonly checkDisciplinaById: CheckDisciplinaById,
    private readonly validation: Validation
  ) {}

  async handle (request: RemoveDisciplinaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.checkDisciplinaById.checkById(request.id)
      if (!exists) {
        return badRequest(new InvalidParamError('id'))
      }
      await this.removeDisicplina.remove(request.id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RemoveDisciplinaController {
  export interface Request {
    id: number
  }
}
