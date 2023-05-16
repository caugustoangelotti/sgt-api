import type { ProfessorModel, UpdateProfessorModel } from '../../domain/models'
import type { AddProfessor, CheckProfessorById, LoadProfessor, RemoveProfessor, UpdateProfessor } from '../../domain/usecases'

import { randFullName, randEmail, randNumber } from '@ngneat/falso'

export class AddProfessorSpy implements AddProfessor {
  params: AddProfessor.Params

  async add (params: AddProfessor.Params): Promise<void> {
    this.params = params
  }
}

export class LoadProfessorSpy implements LoadProfessor {
  result: ProfessorModel[] = [{
    id: randNumber({ min: 10000000, max: 99999999 }),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    dataCadastro: new Date()
  },
  {
    id: randNumber({ min: 10000000, max: 99999999 }),
    name: randFullName(),
    email: randEmail(),
    tempoIc: randNumber({ min: 1, max: 999 }),
    dataCadastro: new Date()
  },
  {
    id: randNumber({ min: 10000000, max: 99999999 }),
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

export class RemoveProfessorSpy implements RemoveProfessor {
  params: number
  result: any
  async remove (id: number): Promise<any> {
    this.params = id
    this.result = true
    return this.result
  }
}

export class CheckProfessorByIdSpy implements CheckProfessorById {
  id: number
  result = true

  async checkById (id: number): Promise<CheckProfessorById.Result> {
    this.id = id
    return this.result
  }
}
