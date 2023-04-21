import type { UpdateProfessor } from '../../domain/usecases'
import type { UpdateProfessorRepository } from '../protocols/db/professor'

export class DbUpdateProfessor implements UpdateProfessor {
  constructor (private readonly updateProfessorRepository: UpdateProfessorRepository) {}

  async update (data: UpdateProfessor.Params): Promise<UpdateProfessor.Result> {
    return await this.updateProfessorRepository.update(data)
  }
}
