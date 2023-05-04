import type { DisciplinaModel } from '../../../../domain/models'

export interface LoadDisciplinaRepository {
  loadAll: () => Promise<LoadDisciplinaRepository.Result>
}
export namespace LoadDisciplinaRepository {
  export type Result = DisciplinaModel[]
}
