import type { DisciplinaModel, UpdateDisciplinaModel } from '../models'

export interface UpdateDisciplina {
  update: (disciplina: UpdateDisciplina.Params) => Promise<UpdateDisciplina.Result>
}

export namespace UpdateDisciplina {
  export type Result = DisciplinaModel
  export type Params = UpdateDisciplinaModel
}
