import type { ProfessorModel } from '../models'

export interface LoadProfessor {
  load: () => Promise<LoadProfessor.Result>
}

export namespace LoadProfessor {
  export type Result = ProfessorModel[]
}
