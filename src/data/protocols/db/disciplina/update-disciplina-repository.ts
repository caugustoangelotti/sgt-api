import type { DisciplinaModel, UpdateDisciplinaModel } from '../../../../domain/models'

export interface UpdateDisciplinaRepository {
  update: (data: UpdateDisciplinaRepository.Params) => Promise<UpdateDisciplinaRepository.Result>
}

export namespace UpdateDisciplinaRepository {
  export type Params = UpdateDisciplinaModel
  export type Result = DisciplinaModel
}
