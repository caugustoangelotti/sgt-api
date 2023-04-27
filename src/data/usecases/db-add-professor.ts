import type { AddProfessor } from '../../domain/usecases'
import type { AddProfessorRepository } from '../../data/protocols'

export class DbAddProfessor implements AddProfessor {
  constructor (private readonly addProfessorRepository: AddProfessorRepository) {}

  async add (data: AddProfessor.Params): Promise<void> {
    await this.addProfessorRepository.add(data)
  }
}
