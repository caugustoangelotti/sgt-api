import type { ProfessorModel } from '../../domain/models/professor'

export interface AddProfessor {
  add: (professor: AddProfessor.Params) => Promise<void>
}

export namespace AddProfessor {
  export type Params = Omit<ProfessorModel, 'id'>
}
