import type { TurmaDTO } from '../../domain/models'
import type { AddTurma, GetDisciplinaById, GetProfessorById } from '../../domain/usecases'
import { InvalidParamError } from '../errors'
import { badRequest, ok, serverError } from '../helpers'
import type { Controller, HttpResponse, Validation } from '../protocols'

export class AddTurmaController implements Controller {
  constructor (
    private readonly addTurma: AddTurma,
    private readonly getProfessorById: GetProfessorById,
    private readonly getDisciplinaById: GetDisciplinaById,
    private readonly validation: Validation
  ) {}

  async handle (request: AddTurmaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { disciplina, professor, ...rest } = request
      const disciplinaData = await this.getDisciplinaById.getById(disciplina)
      if (!disciplinaData) {
        return badRequest(new InvalidParamError('disciplina'))
      }
      const turmaDto: TurmaDTO = { ...rest, disciplina: disciplinaData }
      if (professor) {
        const professorData = await this.getProfessorById.getById(professor)
        if (!professorData) {
          return badRequest(new InvalidParamError('professor'))
        }
        turmaDto.professores = [professorData]
      }
      turmaDto.dataCadastro = new Date()
      const turma = await this.addTurma.add({ ...turmaDto })
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
