export interface TurmaModel {
  id: number
  disciplina: number
  horarios: Horario[]
  modelo: string
  dataCadastro: Date
}

export interface Horario {
  dia: string
  inicio: string
  fim: string
  sala: string
}
