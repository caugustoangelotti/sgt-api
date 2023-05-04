import type { LoadDisciplina } from '../../domain/usecases'
import type { LoadDisciplinaRepository } from '../protocols'

export class DbLoadDisciplina implements LoadDisciplina {
  constructor (private readonly loadDisciplinaRepository: LoadDisciplinaRepository) {}

  async load (): Promise<LoadDisciplina.Result> {
    return await this.loadDisciplinaRepository.loadAll()
  }
}
