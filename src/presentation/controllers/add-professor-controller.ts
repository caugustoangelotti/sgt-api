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
        name: request.name,
        email: request.email,
        tempoIc: request.tempoIc,
        data_cadastro: new Date()
      }

      await this.addProfessor.add(professor)
      const response = {
        ...professor,
        statusCode: 200
      }
      return ok(response)
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
