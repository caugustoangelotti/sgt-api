import type { Professores } from '../../infra/db'

export interface GetProfessorById {
  getById: (id: number) => Promise<GetProfessorById.Result>
}

export namespace GetProfessorById {
  export type Result = Professores
}
