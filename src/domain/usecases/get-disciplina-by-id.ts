import type { Disciplinas } from '../../infra/db'

export interface GetDisciplinaById {
  getById: (id: number) => Promise<GetDisciplinaById.Result>
}

export namespace GetDisciplinaById {
  export type Result = Disciplinas
}
