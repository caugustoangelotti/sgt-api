import type { AddTurma } from '../../domain/usecases'
import { badRequest, noContent, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class AddTurmaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTurma: AddTurma
  ) {}

  async handle (request: AddTurmaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const turma = {
        disciplina: request.disciplina,
        horarios: request.horarios,
        modelo: request.modelo,
        dataCadastro: new Date()
      }
      const optionalFields = ['professor', 'tempoIc']
      for (const field of optionalFields) {
        if (request[field]) {
          turma[field] = request[field]
        }
      }
      await this.addTurma.add(turma)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTurmaController {
  export interface Request {
    disciplina: string
    horarios: Horario[]
    modelo: string
    professor?: string
    tempoIc?: number
  }

  interface Horario {
    dia: string
    horaInicio: string
    horaFim: string
  }
}
