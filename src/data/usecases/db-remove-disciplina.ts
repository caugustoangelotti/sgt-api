import type { RemoveDisciplina } from '../../domain/usecases'
import type { RemoveProfessorRepository } from '../protocols/db'

export class DbRemoveDisciplina implements RemoveDisciplina {
  constructor (private readonly removeProfessorRepository: RemoveProfessorRepository) {}

  async remove (id: number): Promise<RemoveDisciplina.Result> {
    return await this.removeProfessorRepository.remove(id)
  }
}
