import type { DisciplinaModel } from '../models/disciplina'

export interface AddDisciplina {
  add: (disciplina: AddDisciplina.Params) => Promise<any>
}

export namespace AddDisciplina {
  export type Params = Omit<DisciplinaModel, 'id'>
}
