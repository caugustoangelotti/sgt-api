import type { TurmaModel } from '../models'

export interface AddTurma {
  add: (turma: AddTurma.Params) => Promise<void>
}

export namespace AddTurma {
  export type Params = Omit<TurmaModel, 'id'>
}
