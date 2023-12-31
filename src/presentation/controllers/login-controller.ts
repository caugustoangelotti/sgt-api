import type { Controller, HttpResponse, Validation } from '../../presentation/protocols'
import { badRequest, serverError, unauthorized, ok } from '../../presentation/helpers'
import type { Authentication } from '../../domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export interface Request {
    email: string
    password: string
    accountId?: string
  }
}
