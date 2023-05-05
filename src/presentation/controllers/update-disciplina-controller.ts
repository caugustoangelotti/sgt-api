import type { CheckDisciplinaById } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, noContent } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateDisciplinaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkDisciplinaById: CheckDisciplinaById
  ) {}

  async handle (request: UpdateDisciplinaController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const exists = await this.checkDisciplinaById.checkById(request.id)
    if (!exists) {
      return badRequest(new InvalidParamError('id'))
    }
    return noContent()
  }
}

export namespace UpdateDisciplinaController {
  export interface Request {
    id: string
    name?: string
    semestre?: string
    codigo?: number
  }
}
