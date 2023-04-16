import type { ProfessorModel } from '../../../../domain/models'

export interface LoadProfessorRepository {
  loadAll: () => Promise<LoadProfessorRepository.Result>
}
export namespace LoadProfessorRepository {
  export type Result = ProfessorModel[]
}
