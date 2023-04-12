import type { DisciplinaModel } from '../models/disciplina'

export interface AddDisciplina {
  add: (disciplina: AddDisciplina.Params) => Promise<void>
}

export namespace AddDisciplina {
  export type Params = Omit<DisciplinaModel, 'id'>
}
