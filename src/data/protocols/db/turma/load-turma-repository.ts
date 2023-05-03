import type { TurmaModel } from '../../../../domain/models'

export interface LoadTurmaRepository {
  loadAll: () => Promise<LoadTurmaRepository.Result>
}
export namespace LoadTurmaRepository {
  export type Result = TurmaModel[]
}
