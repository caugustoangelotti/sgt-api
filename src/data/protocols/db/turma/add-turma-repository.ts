import type { AddTurma } from '../../../../domain/usecases'

export interface AddTurmaRepository {
  add: (data: AddTurmaRepository.Params) => Promise<any>
}

export namespace AddTurmaRepository {
  export type Params = AddTurma.Params
}
