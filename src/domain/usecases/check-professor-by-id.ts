export interface CheckProfessorById {
  checkById: (id: number) => Promise<CheckProfessorById.Result>
}

export namespace CheckProfessorById {
  export type Result = boolean
}
