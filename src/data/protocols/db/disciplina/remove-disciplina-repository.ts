export interface RemoveDisciplinaRepository {
  remove: (id: number) => Promise<RemoveDisciplinaRepository.Result>
}

export namespace RemoveDisciplinaRepository {
  export type Result = boolean
}
