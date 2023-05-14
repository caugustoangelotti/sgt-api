export interface TurmaModel {
  id: string
  disciplina: string
  horarios: Horario[]
  modelo: string
  professor?: string
  tempoIc?: number
  dataCadastro: Date
}

interface Horario {
  dia: string
  horaInicio: string
  horaFim: string
  sala: string
}
