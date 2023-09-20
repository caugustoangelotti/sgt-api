import type { AddTurma } from '../../domain/usecases'

import { randWord, randNumber, randTextRange, randWeekday } from '@ngneat/falso'

export class AddTurmaSpy implements AddTurma {
  params: any
  async add (params): Promise<any> {
    this.params = params
    return this.params
  }
}
export class LoadTurmaSpy {
  result = [{
    id: randNumber({ min: 10000000, max: 99999999 }),
    disciplina: randTextRange({ min: 40, max: 70 }),
    horarios: [
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() },
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() }
    ],
    modelo: randWord(),
    dataCadastro: new Date()
  },
  {
    id: randNumber({ min: 10000000, max: 99999999 }),
    disciplina: randTextRange({ min: 40, max: 70 }),
    horarios: [
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() },
      { dia: randWeekday(), horaInicio: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, horaFim: `${randNumber({ min: 0, max: 23 })}:${randNumber({ min: 0, max: 59 })}`, sala: randWord() }
    ],
    modelo: randWord(),
    dataCadastro: new Date()
  }
  ]

  async load (): Promise<any> {
    return this.result
  }
}
