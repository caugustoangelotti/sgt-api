import type { DisciplinaModel, UpdateDisciplinaModel } from '../../domain/models'
import type { AddDisciplina, CheckDisciplinaById, LoadDisciplina, RemoveDisciplina, UpdateDisciplina } from '../../domain/usecases'
import { randNumber, randTextRange } from '@ngneat/falso'

export class AddDisciplinaSpy implements AddDisciplina {
  params: AddDisciplina.Params

  async add (params: AddDisciplina.Params): Promise<any> {
    this.params = params
    return this.params
  }
}
export class LoadDisciplinaSpy {
  result: DisciplinaModel[] = [{
    id: randNumber({ min: 10000000, max: 99999999 }),
    name: randTextRange({ min: 40, max: 70 }),
    semestre: randNumber({ min: 1, max: 8 }),
    codigo: randNumber({ min: 10000000, max: 99999999 }).toString(),
    cargaHoraria: randNumber({ min: 20, max: 100 }),
    dataCadastro: new Date()
  },
  {
    id: randNumber({ min: 10000000, max: 99999999 }),
    name: randTextRange({ min: 40, max: 70 }),
    semestre: randNumber({ min: 1, max: 8 }),
    codigo: randNumber({ min: 10000000, max: 99999999 }).toString(),
    cargaHoraria: randNumber({ min: 20, max: 100 }),
    dataCadastro: new Date()
  }
  ]

  async load (): Promise<LoadDisciplina.Result> {
    return this.result
  }
}

export class CheckDisciplinaByIdSpy implements CheckDisciplinaById {
  id: number
  result = true

  async checkById (id: number): Promise<CheckDisciplinaById.Result> {
    this.id = id
    return this.result
  }
}

export class UpdateDisciplinaSpy implements UpdateDisciplina {
  params: UpdateDisciplinaModel
  result: any
  async update (disciplina: UpdateDisciplinaModel): Promise<any> {
    this.params = disciplina
    this.result = {
      ...this.params,
      dataCadastro: new Date()
    }
    return this.result
  }
}

export class RemoveDisciplinaSpy implements RemoveDisciplina {
  params: number
  result: any
  async remove (id: number): Promise<any> {
    this.params = id
    this.result = true
    return this.result
  }
}
