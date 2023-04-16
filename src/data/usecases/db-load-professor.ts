import type { LoadProfessor } from '../../domain/usecases'
import type { LoadProfessorRepository } from '../protocols'

export class DbLoadProfessor implements LoadProfessor {
  constructor (private readonly loadProfessorRepository: LoadProfessorRepository) {}

  async load (): Promise<LoadProfessor.Result> {
    return await this.loadProfessorRepository.loadAll()
  }
}
