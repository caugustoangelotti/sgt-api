import type { GetProfessorById } from '../../domain/usecases'
import type { GetProfessorByIdRepository } from '../protocols'

export class DbGetProfessorById implements GetProfessorById {
  constructor (private readonly getProfessorByIdRepository: GetProfessorByIdRepository) {}

  async getById (id: number): Promise<GetProfessorById.Result> {
    return await this.getProfessorByIdRepository.getById(id)
  }
}
