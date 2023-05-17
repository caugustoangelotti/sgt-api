import type { ProfessorModel } from '../../domain/models/professor'

export interface AddProfessor {
  add: (professor: AddProfessor.Params) => Promise<AddProfessor.Result>
}

export namespace AddProfessor {
  export type Params = Omit<ProfessorModel, 'id' | 'passwordConfirmation'>
  export type Result = boolean
}
