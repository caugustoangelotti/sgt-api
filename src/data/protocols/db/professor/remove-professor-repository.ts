export interface RemoveProfessorRepository {
  remove: (id: number) => Promise<RemoveProfessorRepository.Result>
}

export namespace RemoveProfessorRepository {
  export type Result = boolean
}
