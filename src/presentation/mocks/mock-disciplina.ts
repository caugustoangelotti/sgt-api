import type { DisciplinaModel } from '../../domain/models'
import type { AddDisciplina, LoadDisciplina } from '../../domain/usecases'
import { randUuid, randNumber, randTextRange } from '@ngneat/falso'

export class AddDisciplinaSpy implements AddDisciplina {
  params: AddDisciplina.Params

  async add (params: AddDisciplina.Params): Promise<void> {
    this.params = params
  }
}
export class LoadDisciplinaSpy {
  result: DisciplinaModel[] = [{
    id: randUuid(),
    name: randTextRange({ min: 40, max: 70 }),
    semestre: randNumber({ min: 1, max: 8 }),
    codigo: randNumber({ min: 10000000, max: 99999999 }).toString(),
    dataCadastro: new Date()
  },
  {
    id: randUuid(),
    name: randTextRange({ min: 40, max: 70 }),
    semestre: randNumber({ min: 1, max: 8 }),
    codigo: randNumber({ min: 10000000, max: 99999999 }).toString(),
    dataCadastro: new Date()
  }
  ]

  async load (): Promise<LoadDisciplina.Result> {
    return this.result
  }
}
