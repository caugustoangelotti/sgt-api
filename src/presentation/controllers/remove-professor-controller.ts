import type { Controller, HttpResponse, Validation } from '../protocols'

export class RemoveProfessorController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: RemoveProfessorController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return { statusCode: 400, body: error }
    }
    return await Promise.resolve({ statusCode: 200, body: {} })
  }
}

export namespace RemoveProfessorController {
  export interface Request {
    id: number
  }
}
