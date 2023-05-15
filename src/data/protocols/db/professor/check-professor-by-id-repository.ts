export interface CheckProfessorByIdRepository {
  checkById: (id: number) => Promise<CheckProfessorByIdRepository.Result>
}

export namespace CheckProfessorByIdRepository {
  export type Result = boolean
}
