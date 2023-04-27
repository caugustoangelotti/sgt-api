import { badRequest } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class AddTurmaController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null as any
  }
}
