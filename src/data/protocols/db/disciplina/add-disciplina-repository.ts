import type { AddDisciplina } from '../../../../domain/usecases'

export interface AddDisciplinaRepository {
  add: (data: AddDisciplinaRepository.Params) => Promise<void>
}

export namespace AddDisciplinaRepository {
  export type Params = AddDisciplina.Params
}
