import type { ProfessorModel } from '../../domain/models'
import type { AddProfessor, LoadProfessor } from '../../domain/usecases'

import { randUuid, randFullName, randEmail, randNumber } from '@ngneat/falso'

export class AddProfessorSpy implements AddProfessor {
  params: AddProfessor.Params

  async add (params: AddProfessor.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProfessorSpy implements LoadProfessor {
  result: ProfessorModel[] = [{
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    data_cadastro: new Date()
  },
  {
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    data_cadastro: new Date()
  },
  {
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    data_cadastro: new Date()
  }
  ]

  async load (): Promise<LoadProfessor.Result> {
    return this.result
  }
}
