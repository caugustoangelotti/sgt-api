import type { ProfessorModel, UpdateProfessorModel } from '../models'

export interface UpdateProfessor {
  update: (professor: UpdateProfessorModel) => Promise<UpdateProfessor.Result>
}

export namespace UpdateProfessor {
  export type Result = ProfessorModel
}
