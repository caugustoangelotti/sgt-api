import type { CheckDisciplinaById } from '../../domain/usecases'
import type { CheckDisciplinaByIdRepository } from '../protocols'

export class DbCheckDisciplinaById implements CheckDisciplinaById {
  constructor (private readonly checkDisciplinaByIdRepository: CheckDisciplinaByIdRepository) {}

  async checkById (id: number): Promise<CheckDisciplinaById.Result> {
    return await this.checkDisciplinaByIdRepository.checkById(id)
  }
}
