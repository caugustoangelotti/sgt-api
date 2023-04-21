import type { AddProfessor } from '../../../../domain/usecases'

export interface AddProfessorRepository {
  add: (data: AddProfessorRepository.Params) => Promise<void>
}

export namespace AddProfessorRepository {
  export type Params = AddProfessor.Params
}
