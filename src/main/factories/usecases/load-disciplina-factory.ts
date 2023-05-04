import type { LoadDisciplina } from '../../../domain/usecases'
import { DisciplinaMongoRepository } from '../../../infra/db/mongodb'
import { DbLoadDisciplina } from '../../../data/usecases'

export const makeDbLoadDisciplina = (): LoadDisciplina => {
  const disciplinaMongoRepository = new DisciplinaMongoRepository()
  return new DbLoadDisciplina(disciplinaMongoRepository)
}
