import type { AddTurma } from '../../domain/usecases'
import type { AddTurmaRepository } from '../protocols'

export class DbAddTurma implements AddTurma {
  constructor (private readonly addTurmaRepository: AddTurmaRepository) {}

  async add (data: AddTurma.Params): Promise<void> {
    await this.addTurmaRepository.add(data)
  }
}
