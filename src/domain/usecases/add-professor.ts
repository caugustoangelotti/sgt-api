export interface AddProfessor {
  add: (professor: AddProfessor.Params) => Promise<void>
}

export namespace AddProfessor {
  export type Params = Omit<AddProfessor, 'id'>
}
