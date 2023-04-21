import type { ProfessorModel, UpdateProfessorModel } from '../../../../domain/models'

export interface UpdateProfessorRepository {
  update: (data: UpdateProfessorRepository.Params) => Promise<UpdateProfessorRepository.Result>
}

export namespace UpdateProfessorRepository {
  export type Params = UpdateProfessorModel
  export type Result = ProfessorModel
}
