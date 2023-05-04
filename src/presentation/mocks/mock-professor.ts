import type { ProfessorModel, UpdateProfessorModel } from '../../domain/models'
import type { AddProfessor, CheckProfessorById, LoadProfessor, UpdateProfessor } from '../../domain/usecases'

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
    dataCadastro: new Date()
  },
  {
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    dataCadastro: new Date()
  },
  {
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    dataCadastro: new Date()
  }
  ]

  async load (): Promise<LoadProfessor.Result> {
    return this.result
  }
}

export class UpdateProfessorSpy implements UpdateProfessor {
  params: UpdateProfessorModel
  result: any
  async update (professor: UpdateProfessorModel): Promise<any> {
    this.params = professor
    this.result = {
      ...this.params,
      dataCadastro: new Date(),
      tempoIc: 10
    }
    return this.result
  }
}

export class CheckProfessorByIdSpy implements CheckProfessorById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckProfessorById.Result> {
    this.id = id
    return this.result
  }
}
