import type { Disciplinas } from '../../../../infra/db'

export interface GetDisciplinaByIdRepository {
  getById: (id: number) => Promise<GetDisciplinaByIdRepository.Result>
}

export namespace GetDisciplinaByIdRepository {
  export type Result = Disciplinas
}
