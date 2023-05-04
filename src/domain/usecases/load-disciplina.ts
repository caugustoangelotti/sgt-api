import type { DisciplinaModel } from '../models'

export interface LoadDisciplina {
  load: () => Promise<LoadDisciplina.Result>
}

export namespace LoadDisciplina {
  export type Result = DisciplinaModel[]
}
