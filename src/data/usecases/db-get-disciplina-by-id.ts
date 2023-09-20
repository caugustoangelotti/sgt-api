import type { GetDisciplinaById } from '../../domain/usecases'
import type { GetDisciplinaByIdRepository } from '../protocols'

export class DbGetDisciplinaById implements GetDisciplinaById {
  constructor (private readonly getDisciplinaByIdRepository: GetDisciplinaByIdRepository) {}

  async getById (id: number): Promise<GetDisciplinaById.Result> {
    return await this.getDisciplinaByIdRepository.getById(id)
  }
}
