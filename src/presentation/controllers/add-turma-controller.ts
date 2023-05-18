import type { AddTurma, CheckDisciplinaById, CheckProfessorById } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class AddTurmaController implements Controller {
  constructor (
    private readonly addTurma: AddTurma,
    private readonly checkProfessorById: CheckProfessorById,
    private readonly checkDisciplinaById: CheckDisciplinaById,
    private readonly validation: Validation
  ) {}

  async handle (request: AddTurmaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const existsDisciplina = await this.checkDisciplinaById.checkById(request.disciplina)
      if (!existsDisciplina) {
        return badRequest(new InvalidParamError('disciplina'))
      }
      if (request.professor) {
        const existsProfessor = await this.checkProfessorById.checkById(request.professor)
        if (!existsProfessor) {
          return badRequest(new InvalidParamError('professor'))
        }
      }
      const turma = await this.addTurma.add({ ...request, dataCadastro: new Date() })
      return ok({ ...turma })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTurmaController {
  export interface Request {
    disciplina: number
    professor?: number
    horarios: Horario[]
    projetor?: boolean
    lab?: boolean
    aprovada?: boolean
    modelo: string
    dataCadastro: Date
  }

  interface Horario {
    dia: string
    inicio: string
    fim: string
    sala: string
  }
}
