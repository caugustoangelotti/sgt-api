import type { AddProfessor } from '../../domain/usecases/add-professor'
import { ok, badRequest, serverError } from '../helpers/http-helper'
import type { Controller, Validation, HttpResponse } from '../protocols'

export class AddProfessorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProfessor: AddProfessor
  ) {}

  async handle (request: AddProfessorController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const professor = {
        ...request,
        data_cadastro: new Date()
      }

      await this.addProfessor.add(professor)
      return ok(professor)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AddProfessorController {
  export interface Request {
    name: string
    email: string
    tempoIc: number
  }
}
