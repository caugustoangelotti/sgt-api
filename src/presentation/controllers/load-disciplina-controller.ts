import type { LoadDisciplina } from '../../domain/usecases'
import { ok, serverError } from '../helpers'
import type { Controller, HttpResponse } from '../protocols'

export class LoadDisciplinaController implements Controller {
  constructor (
    private readonly loadDisciplina: LoadDisciplina
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const disciplinas = await this.loadDisciplina.load()
      return ok(disciplinas)
    } catch (error) {
      return serverError(error)
    }
  }
}
