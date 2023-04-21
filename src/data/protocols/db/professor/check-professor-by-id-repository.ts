export interface CheckProfessorByIdRepository {
  checkById: (id: string) => Promise<CheckProfessorByIdRepository.Result>
}

export namespace CheckProfessorByIdRepository {
  export type Result = boolean
}
