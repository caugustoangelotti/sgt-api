import type { TurmaModel } from '../../domain/models'
import type { LoadTurma } from '../../domain/usecases'
import { randUuid, randWord, randNumber, randTextRange, randWeekday } from '@ngneat/falso'

export class AddTurmaSpy {
  params: any
  async add (params): Promise<void> {
    this.params = params
  }
}
export class LoadTurmaSpy {
  result: TurmaModel[] = [{
    id: randUuid(),
    disciplina: randTextRange({ min: 40, max: 70 }),
    horarios: [
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() },
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() }
    ],
    modelo: randWord(),
    dataCadastro: new Date()
  },
  {
    id: randUuid(),
    disciplina: randTextRange({ min: 40, max: 70 }),
    horarios: [
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() },
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() }
    ],
    modelo: randWord(),
    dataCadastro: new Date()
  }
  ]

  async load (): Promise<LoadTurma.Result> {
    return this.result
  }
}
