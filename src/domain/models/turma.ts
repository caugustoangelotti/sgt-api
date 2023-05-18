export interface TurmaModel {
  id: number
  disciplina: number
  professor?: number
  horarios: Horario[]
  projetor?: boolean
  lab?: boolean
  aprovada?: boolean
  modelo: string
  dataCadastro: Date
}

export interface Horario {
  dia: string
  inicio: string
  fim: string
  sala: string
}
