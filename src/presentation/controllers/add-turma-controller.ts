import type { AddTurma } from '../../domain/usecases'
import { badRequest } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class AddTurmaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTurma: AddTurma
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const turma = {
      disciplina: request.disciplina,
      horarios: request.horarios,
      modelo: request.modelo,
      semestre: request.semestre,
      data_cadastro: new Date()
    }
    const fields = ['professor', 'tempo_ic']
    for (const field of fields) {
      if (request[field]) {
        turma[field] = request[field]
      }
    }
    await this.addTurma.add(turma)
    return null as any
  }
}
