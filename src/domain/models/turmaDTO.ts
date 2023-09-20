import type { Disciplinas, Professores } from '../../infra/db'
import type { Horario } from './turma'

export interface TurmaDTO {
  disciplina: Disciplinas
  professores?: Professores[]
  horarios: Horario[]
  projetor?: boolean
  lab?: boolean
  aprovada?: boolean
  modelo: string
  dataCadastro: Date
}
