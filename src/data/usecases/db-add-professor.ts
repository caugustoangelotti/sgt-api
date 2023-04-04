import type { AddProfessor } from '../../domain/usecases/add-professor'
import type { AddProfessorRepository } from '../../data/protocols/db/professor/add-professor-repository'

export class DbAddProfessor implements AddProfessor {
  constructor (private readonly addProfessorRepository: AddProfessorRepository) {}

  async add (data: AddProfessor.Params): Promise<void> {
    await this.addProfessorRepository.add(data)
  }
}
