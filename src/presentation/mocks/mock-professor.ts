import type { AddProfessor } from '../../domain/usecases/add-professor'

export class AddProfessorSpy implements AddProfessor {
  params: AddProfessor.Params

  async add (params: AddProfessor.Params): Promise<void> {
    this.params = params
  }
}
