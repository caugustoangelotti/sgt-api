import type { LoadTurma } from '../../domain/usecases'
import { ok, serverError } from '../helpers'
import type { Controller, HttpResponse } from '../protocols'

export class LoadTurmaController implements Controller {
  constructor (
    private readonly loadTurma: LoadTurma
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const turmas = await this.loadTurma.load()
      return ok(turmas)
    } catch (error) {
      return serverError(error)
    }
  }
}
