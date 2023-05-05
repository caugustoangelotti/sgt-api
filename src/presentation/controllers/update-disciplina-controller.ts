import type { CheckDisciplinaById, UpdateDisciplina } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateDisciplinaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkDisciplinaById: CheckDisciplinaById,
    private readonly updateDisciplina: UpdateDisciplina
  ) {}

  async handle (request: UpdateDisciplinaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const exists = await this.checkDisciplinaById.checkById(request.id)
      if (!exists) {
        return badRequest(new InvalidParamError('id'))
      }
      const disciplina = {
        id: request.id
      }
      const fields = ['id', 'name', 'semestre', 'codigo']
      for (const field of fields) {
        if (request[field]) {
          disciplina[field] = request[field]
        }
      }
      const updatedDisciplina = await this.updateDisciplina.update(disciplina)
      return ok(updatedDisciplina)
    } catch (error) {
      return serverError(error)
    }
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
