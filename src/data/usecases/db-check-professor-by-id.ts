import type { CheckProfessorById } from '../../domain/usecases'
import type { CheckProfessorByIdRepository } from '../protocols'

export class DbCheckProfessorById implements CheckProfessorById {
  constructor (private readonly checkProfessorByIdRepository: CheckProfessorByIdRepository) {}

  async checkById (id: number): Promise<CheckProfessorById.Result> {
    return await this.checkProfessorByIdRepository.checkById(id)
  }
}
