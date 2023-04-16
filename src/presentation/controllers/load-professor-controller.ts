import type { LoadProfessor } from '../../domain/usecases'
import { ok } from '../helpers/http-helper'
import type { Controller, HttpResponse } from '../protocols'

export class LoadProfessorController implements Controller {
  constructor (
    private readonly loadProfessor: LoadProfessor
  ) {}

  async handle (): Promise<HttpResponse> {
    const professores = await this.loadProfessor.load()
    return ok(professores)
  }
}
