import type { AddProfessor } from '../../../../domain/usecases'

export interface AddProfessorRepository {
  add: (data: AddProfessorRepository.Params) => Promise<boolean>
}

export namespace AddProfessorRepository {
  export type Params = AddProfessor.Params
  export type Result = boolean
}
