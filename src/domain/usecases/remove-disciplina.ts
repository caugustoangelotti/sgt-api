export interface RemoveDisciplina {
  remove: (id: number) => Promise<RemoveDisciplina.Result>
}

export namespace RemoveDisciplina {
  export type Result = boolean
}
