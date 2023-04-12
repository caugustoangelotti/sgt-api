import type { AddDisciplina } from '../../domain/usecases/'
import { ok, badRequest } from '../helpers/http-helper'
import type { Controller, Validation, HttpResponse } from '../protocols'

export class AddDisciplinaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDisciplina: AddDisciplina
  ) {}

  async handle (request: AddDisciplinaController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return ok({ statusCode: 200 })
  }
}
export namespace AddDisciplinaController {
  export interface Request {
    name: string
    semestre: number
    codigo: string
  }
}
