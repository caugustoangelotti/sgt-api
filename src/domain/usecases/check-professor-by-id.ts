export interface CheckProfessorById {
  checkById: (id: string) => Promise<CheckProfessorById.Result>
}

export namespace CheckProfessorById {
  export type Result = boolean
}
