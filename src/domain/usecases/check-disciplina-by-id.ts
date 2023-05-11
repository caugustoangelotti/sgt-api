export interface CheckDisciplinaById {
  checkById: (id: number) => Promise<CheckDisciplinaById.Result>
}

export namespace CheckDisciplinaById {
  export type Result = boolean
}
