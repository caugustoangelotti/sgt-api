import { DbCheckDisciplinaById } from '../../../data/usecases'
import type { CheckDisciplinaById } from '../../../domain/usecases'
import { DisciplinaMongoRepository } from '../../../infra/db'

export const makeDbCheckDisciplinaById = (): CheckDisciplinaById => {
  const professorMongoRepository = new DisciplinaMongoRepository()
  return new DbCheckDisciplinaById(professorMongoRepository)
}
