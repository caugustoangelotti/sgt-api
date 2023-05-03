import type { LoadTurma } from '../../domain/usecases'
import type { LoadTurmaRepository } from '../protocols'

export class DbLoadTurma implements LoadTurma {
  constructor (private readonly loadTurmaRepository: LoadTurmaRepository) {}

  async load (): Promise<LoadTurma.Result> {
    return await this.loadTurmaRepository.loadAll()
  }
}
