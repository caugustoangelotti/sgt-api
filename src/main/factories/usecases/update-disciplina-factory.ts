import { DisciplinaMongoRepository } from '../../../infra/db/mongodb'
import { DbUpdateDisciplina } from '../../../data/usecases'
import type { UpdateDisciplina } from '../../../domain/usecases'

export const makeDbUpdateDisciplina = (): UpdateDisciplina => {
  const disciplinaMongoRepository = new DisciplinaMongoRepository()
  return new DbUpdateDisciplina(disciplinaMongoRepository)
}
