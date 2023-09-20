import type { Professores } from '../../../../infra/db'

export interface GetProfessorByIdRepository {
  getById: (id: number) => Promise<GetProfessorByIdRepository.Result>
}

export namespace GetProfessorByIdRepository {
  export type Result = Professores
}
