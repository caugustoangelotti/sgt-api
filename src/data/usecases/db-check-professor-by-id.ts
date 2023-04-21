import type { CheckProfessorById } from '../../domain/usecases'
import type { CheckProfessorByIdRepository } from '../protocols'

export class DbCheckSurveyById implements CheckProfessorById {
  constructor (private readonly checkProfessorByIdRepository: CheckProfessorByIdRepository) {}

  async checkById (id: string): Promise<CheckProfessorById.Result> {
    return await this.checkProfessorByIdRepository.checkById(id)
  }
}