import type { AddProfessor } from '../../domain/usecases'
import { ok, badRequest, serverError } from '../helpers'
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
        dataCadastro: new Date()
      }

      await this.addProfessor.add(professor)
      return ok({ ...professor, account_id: request.account_id })
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
    account_id?: string
  }
}
