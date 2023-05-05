import type { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateDisciplinaController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateDisciplinaController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return await Promise.resolve({ statusCode: 400, body: error })
    }
    return await Promise.resolve({ statusCode: 200, body: {} })
  }
}

export namespace UpdateDisciplinaController {
  export interface Request {
    id: string
    name?: string
    semestre?: string
    codigo?: number
  }
}
