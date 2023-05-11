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
        cargaHoraria: request.cargaHoraria,
        dataCadastro: new Date()
      }
      await this.addDisciplina.add(disciplina)
      return ok({ ...disciplina, account_id: request.account_id })
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
    cargaHoraria: number
    account_id?: string
  }
}
