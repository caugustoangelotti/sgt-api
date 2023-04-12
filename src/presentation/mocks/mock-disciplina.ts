import type { AddDisciplina } from '../../domain/usecases/add-disciplina'

export class AddDisciplinaSpy implements AddDisciplina {
  params: AddDisciplina.Params

  async add (params: AddDisciplina.Params): Promise<void> {
    this.params = params
  }
}
