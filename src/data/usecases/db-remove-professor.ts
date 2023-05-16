import type { RemoveProfessor } from '../../domain/usecases'
import type { RemoveProfessorRepository } from '../protocols/db'

export class DbRemoveProfessor implements RemoveProfessor {
  constructor (private readonly removeProfessorRepository: RemoveProfessorRepository) {}

  async remove (id: number): Promise<RemoveProfessor.Result> {
    return await this.removeProfessorRepository.remove(id)
  }
}
