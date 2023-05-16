import { DbCheckDisciplinaById } from '../../../data/usecases'
import type { CheckDisciplinaById } from '../../../domain/usecases'
import { DisciplinaPostgresRepository } from '../../../infra/db'

export const makeDbCheckDisciplinaById = (): CheckDisciplinaById => {
  const professorPostgresRepository = new DisciplinaPostgresRepository()
  return new DbCheckDisciplinaById(professorPostgresRepository)
}
