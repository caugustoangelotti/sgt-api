import type { ProfessorModel, UpdateProfessorModel } from '../models'

export interface UpdateProfessor {
  update: (professor: UpdateProfessor.Params) => Promise<UpdateProfessor.Result>
}

export namespace UpdateProfessor {
  export type Result = ProfessorModel
  export type Params = UpdateProfessorModel
}
