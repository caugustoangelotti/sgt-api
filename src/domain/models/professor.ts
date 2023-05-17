export interface ProfessorModel {
  id: number
  name: string
  email: string
  password: string
  passwordConfirmation: string
  tempoIc: number
  role?: string
  dataCadastro: Date
}
