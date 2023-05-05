import type { UpdateDisciplina } from '../../domain/usecases'
import type { UpdateDisciplinaRepository } from '../protocols'

export class DbUpdateDisciplina implements UpdateDisciplina {
  constructor (private readonly updateDisciplinaRepository: UpdateDisciplinaRepository) {}

  async update (data: UpdateDisciplina.Params): Promise<UpdateDisciplina.Result> {
    return await this.updateDisciplinaRepository.update(data)
  }
}
