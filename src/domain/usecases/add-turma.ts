import type { TurmaDTO } from '../models'

export interface AddTurma {
  add: (turma: AddTurma.Params) => Promise<any>
}

export namespace AddTurma {
  export type Params = TurmaDTO
}
