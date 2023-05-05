export interface CheckDisciplinaByIdRepository {
  checkById: (id: string) => Promise<CheckDisciplinaByIdRepository.Result>
}

export namespace CheckDisciplinaByIdRepository {
  export type Result = boolean
}
