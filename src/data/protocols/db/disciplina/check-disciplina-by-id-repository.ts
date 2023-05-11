export interface CheckDisciplinaByIdRepository {
  checkById: (id: number) => Promise<CheckDisciplinaByIdRepository.Result>
}

export namespace CheckDisciplinaByIdRepository {
  export type Result = boolean
}
