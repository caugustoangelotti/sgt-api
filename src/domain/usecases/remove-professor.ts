export interface RemoveProfessor {
  remove: (id: number) => Promise<RemoveProfessor.Result>
}

export namespace RemoveProfessor {
  export type Result = boolean
}
