export interface CheckDisciplinaById {
  checkById: (id: string) => Promise<CheckDisciplinaById.Result>
}

export namespace CheckDisciplinaById {
  export type Result = boolean
}
