export interface TurmaModel {
  id: string
  disciplina: string
  horarios: Horario[]
  modelo: string
  professor?: string
  tempo_ic?: number
  data_cadastro: Date
}

interface Horario {
  dia: string
  horaInicio: string
  horaFim: string
}
