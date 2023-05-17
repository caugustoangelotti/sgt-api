import type { AddProfessor } from '../../domain/usecases'
import { EmailInUseError } from '../errors'
import { ok, badRequest, serverError, forbidden } from '../helpers'
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
      let { role } = request
      if (role === 'admin') {
        role = undefined
      }
      const professor = {
        name: request.name,
        email: request.email,
        password: request.password,
        tempoIc: request.tempoIc,
        role,
        dataCadastro: new Date()
      }

      const isValid = await this.addProfessor.add(professor)
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      const { password, ...rest } = professor
      return ok({ ...rest, accountId: request.accountId })
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AddProfessorController {
  export interface Request {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    tempoIc: number
    role?: string
    accountId?: string
  }
}
