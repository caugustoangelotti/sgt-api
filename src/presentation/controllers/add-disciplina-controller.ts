import type { AddDisciplina } from '../../domain/usecases/'
import { ok, badRequest, serverError } from '../helpers/http-helper'
import type { Controller, Validation, HttpResponse } from '../protocols'

export class AddDisciplinaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDisciplina: AddDisciplina
  ) {}

  async handle (request: AddDisciplinaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const disciplina: AddDisciplina.Params = {
        name: request.name,
        semestre: request.semestre,
        codigo: request.codigo,
        data_cadastro: new Date()
      }
      await this.addDisciplina.add(disciplina)
      return ok(disciplina)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AddDisciplinaController {
  export interface Request {
    name: string
    semestre: number
    codigo: string
  }
}
