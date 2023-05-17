import type { AddDisciplina } from '../../domain/usecases'
import type { AddDisciplinaRepository } from '../../data/protocols/db'

export class DbAddDisciplina implements AddDisciplina {
  constructor (private readonly addDisciplinaRepository: AddDisciplinaRepository) {}

  async add (data: AddDisciplina.Params): Promise<any> {
    return await this.addDisciplinaRepository.add(data)
  }
}
