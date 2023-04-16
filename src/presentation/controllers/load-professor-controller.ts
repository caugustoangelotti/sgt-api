import type { LoadProfessor } from '../../domain/usecases'
import { ok, serverError } from '../helpers'
import type { Controller, HttpResponse } from '../protocols'

export class LoadProfessorController implements Controller {
  constructor (
    private readonly loadProfessor: LoadProfessor
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const professores = await this.loadProfessor.load()
      return ok(professores)
    } catch (error) {
      return serverError(error)
    }
  }
}
